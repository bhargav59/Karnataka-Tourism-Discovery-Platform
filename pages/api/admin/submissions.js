const { query, hasDatabase } = require("../../../lib/db/connection");

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      if (!hasDatabase()) {
        return res.status(200).json({ success: true, submissions: [] });
      }
      const result = await query(
        `SELECT * FROM submissions WHERE status = 'pending' ORDER BY created_at ASC LIMIT 100`,
        []
      );
      return res.status(200).json({ success: true, submissions: result.rows });
    } catch (e) {
      console.error("Admin list submissions error:", e);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    // Approve or reject
    try {
      const { id, action } = req.body;
      if (!id || !["approve", "reject"].includes(action)) {
        return res.status(400).json({ message: "Invalid request" });
      }

      if (!hasDatabase()) {
        return res
          .status(200)
          .json({ success: true, message: `Submission ${action}d (mock)` });
      }

      if (action === "reject") {
        await query(
          `UPDATE submissions SET status='rejected', reviewed_at = NOW() WHERE id = $1`,
          [id]
        );
        return res
          .status(200)
          .json({ success: true, message: "Submission rejected" });
      }

      // Approve: create attraction from JSON
      const subRes = await query(`SELECT * FROM submissions WHERE id = $1`, [
        id,
      ]);
      if (subRes.rowCount === 0)
        return res.status(404).json({ message: "Not found" });
      const s = subRes.rows[0];
      const data = s.attraction_data_json || {};
      const slug = String(data.name || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const ins = await query(
        `INSERT INTO attractions (slug, name, name_kannada, type, category, description, short_description, district, city, published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true) RETURNING *`,
        [
          slug,
          data.name || null,
          data.name_kannada || null,
          data.type || null,
          data.category || null,
          data.description || null,
          data.description ? data.description.slice(0, 160) : null,
          data.district || null,
          data.city || null,
        ]
      );
      const attraction = ins.rows[0];

      // Insert photos if present
      const photos = Array.isArray(data.photos) ? data.photos : [];
      for (let i = 0; i < Math.min(photos.length, 10); i++) {
        const url = typeof photos[i] === "string" ? photos[i] : photos[i]?.url;
        if (url) {
          await query(
            `INSERT INTO photos (attraction_id, url, is_cover, order_index) VALUES ($1, $2, $3, $4)`,
            [attraction.id, url, i === 0, i]
          );
        }
      }

      await query(
        `UPDATE submissions SET status='approved', reviewed_at = NOW() WHERE id = $1`,
        [id]
      );
      return res
        .status(200)
        .json({ success: true, message: "Submission approved", attraction });
    } catch (e) {
      console.error("Admin approve/reject error:", e);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
