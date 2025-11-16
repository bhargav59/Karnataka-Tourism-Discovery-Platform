// Follow/Unfollow/List endpoint
const { query, hasDatabase } = require("../../lib/db/connection");

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // TODO: Verify JWT and extract real user id
  const currentUserId = 1;

  if (req.method === "GET") {
    try {
      const listType = (req.query.list || "following").toString();

      if (!hasDatabase()) {
        const mock =
          listType === "followers"
            ? [
                {
                  user_id: 2,
                  name: "Priya",
                  email: "priya@example.com",
                  avatar_url: null,
                  followed_at: new Date().toISOString(),
                },
              ]
            : [
                {
                  user_id: 3,
                  name: "Ravi",
                  email: "ravi@example.com",
                  avatar_url: null,
                  followed_at: new Date().toISOString(),
                },
              ];
        return res
          .status(200)
          .json({ success: true, list: listType, users: mock });
      }

      if (listType === "followers") {
        const result = await query(
          `SELECT uf.follower_id AS user_id, u.name, u.email, u.avatar_url, uf.created_at AS followed_at
           FROM user_follows uf
           JOIN users u ON u.id = uf.follower_id
           WHERE uf.following_id = $1
           ORDER BY uf.created_at DESC
           LIMIT 100`,
          [currentUserId]
        );
        return res
          .status(200)
          .json({ success: true, list: "followers", users: result.rows });
      } else {
        const result = await query(
          `SELECT uf.following_id AS user_id, u.name, u.email, u.avatar_url, uf.created_at AS followed_at
           FROM user_follows uf
           JOIN users u ON u.id = uf.following_id
           WHERE uf.follower_id = $1
           ORDER BY uf.created_at DESC
           LIMIT 100`,
          [currentUserId]
        );
        return res
          .status(200)
          .json({ success: true, list: "following", users: result.rows });
      }
    } catch (error) {
      console.error("List follow error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { target_user_id } = req.body || {};
      if (!target_user_id) {
        return res.status(400).json({ message: "target_user_id is required" });
      }
      if (Number(target_user_id) === Number(currentUserId)) {
        return res.status(400).json({ message: "Cannot follow yourself" });
      }

      if (!hasDatabase()) {
        return res
          .status(201)
          .json({ success: true, message: "Followed (mock)" });
      }

      const result = await query(
        `INSERT INTO user_follows (follower_id, following_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING
         RETURNING *`,
        [currentUserId, target_user_id]
      );

      if (result.rowCount === 0) {
        return res
          .status(200)
          .json({ success: true, message: "Already following" });
      }

      return res.status(201).json({ success: true, message: "Now following" });
    } catch (error) {
      console.error("Follow error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { target_user_id } = req.query;
      if (!target_user_id) {
        return res.status(400).json({ message: "target_user_id is required" });
      }

      if (!hasDatabase()) {
        return res
          .status(200)
          .json({ success: true, message: "Unfollowed (mock)" });
      }

      await query(
        `DELETE FROM user_follows WHERE follower_id = $1 AND following_id = $2`,
        [currentUserId, target_user_id]
      );
      return res.status(200).json({ success: true, message: "Unfollowed" });
    } catch (error) {
      console.error("Unfollow error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
