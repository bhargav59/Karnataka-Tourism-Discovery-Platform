// Activity feed for followed users (reviews + favorites)
const { query, hasDatabase } = require("../../lib/db/connection");

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // TODO: Verify JWT and extract real user id
  const currentUserId = 1;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    if (!hasDatabase()) {
      const mock = [
        {
          type: "review",
          created_at: new Date().toISOString(),
          user: { id: 2, name: "Priya", avatar_url: null },
          attraction: { id: 1, slug: "iskcon-temple", name: "ISKCON Temple" },
          rating: 5,
          review_text: "Beautiful darshan and serene ambience!",
        },
        {
          type: "favorite",
          created_at: new Date().toISOString(),
          user: { id: 3, name: "Ravi", avatar_url: null },
          attraction: { id: 2, slug: "vidhana-soudha", name: "Vidhana Soudha" },
        },
      ];
      return res.status(200).json({ success: true, items: mock });
    }

    const sql = `
      (
        SELECT 'review' AS type,
               r.created_at,
               r.user_id,
               u.name AS user_name,
               u.avatar_url,
               r.attraction_id,
               a.slug AS attraction_slug,
               a.name AS attraction_name,
               r.rating::int,
               r.review_text
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        JOIN attractions a ON a.id = r.attraction_id
        WHERE r.user_id IN (SELECT following_id FROM user_follows WHERE follower_id = $1)
      )
      UNION ALL
      (
        SELECT 'favorite' AS type,
               f.created_at,
               f.user_id,
               u.name AS user_name,
               u.avatar_url,
               f.attraction_id,
               a.slug AS attraction_slug,
               a.name AS attraction_name,
               NULL::int AS rating,
               NULL::text AS review_text
        FROM favorites f
        JOIN users u ON u.id = f.user_id
        JOIN attractions a ON a.id = f.attraction_id
        WHERE f.user_id IN (SELECT following_id FROM user_follows WHERE follower_id = $1)
      )
      ORDER BY created_at DESC
      LIMIT 100
    `;

    const result = await query(sql, [currentUserId]);

    const items = result.rows.map((r) => ({
      type: r.type,
      created_at: r.created_at,
      user: { id: r.user_id, name: r.user_name, avatar_url: r.avatar_url },
      attraction: {
        id: r.attraction_id,
        slug: r.attraction_slug,
        name: r.attraction_name,
      },
      rating: r.rating || undefined,
      review_text: r.review_text || undefined,
    }));

    return res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Feed error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
