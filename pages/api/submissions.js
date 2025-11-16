const { query, hasDatabase } = require("../../lib/db/connection");

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        name_kannada,
        type,
        category,
        description,
        district,
        city,
        photos = [],
      } = req.body;
      if (!name || !type || !description) {
        return res
          .status(400)
          .json({ message: "Name, type and description are required" });
      }

      const submission = {
        id: Math.floor(Math.random() * 100000),
        submitted_by_user_id: 1,
        attraction_data_json: {
          name,
          name_kannada,
          type,
          category,
          description,
          district,
          city,
          photos,
        },
        status: "pending",
        created_at: new Date().toISOString(),
      };

      if (!hasDatabase()) {
        return res
          .status(201)
          .json({
            success: true,
            message: "Submission received (mock)",
            submission,
          });
      }

      const result = await query(
        `INSERT INTO submissions (submitted_by_user_id, attraction_data_json, status)
         VALUES ($1, $2, 'pending') RETURNING *`,
        [1, submission.attraction_data_json]
      );
      return res
        .status(201)
        .json({
          success: true,
          message: "Submission received",
          submission: result.rows[0],
        });
    } catch (e) {
      console.error("Create submission error:", e);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    // List current user's submissions
    try {
      if (!hasDatabase()) {
        return res.status(200).json({ success: true, submissions: [] });
      }
      const result = await query(
        `SELECT * FROM submissions WHERE submitted_by_user_id = $1 ORDER BY created_at DESC LIMIT 100`,
        [1]
      );
      return res.status(200).json({ success: true, submissions: result.rows });
    } catch (e) {
      console.error("List submissions error:", e);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
