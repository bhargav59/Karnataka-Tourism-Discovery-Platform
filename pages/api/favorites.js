// Favorites endpoint - Add/Remove/List
const { query, hasDatabase } = require("../../lib/db/connection");

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  // Check authentication
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  // TODO: Verify JWT token and get user ID

  if (req.method === "GET") {
    // Get user's favorites
    try {
      if (!hasDatabase()) {
        const mockFavorites = [
          {
            id: 1,
            user_id: 1,
            attraction_id: 1,
            attraction: {
              id: 1,
              slug: "iskcon-temple",
              name: "ISKCON Temple",
              type: "temple",
              city: "Bangalore",
              short_description: "A beautiful temple dedicated to Lord Krishna",
            },
            created_at: new Date().toISOString(),
          },
        ];
        return res
          .status(200)
          .json({ success: true, favorites: mockFavorites });
      }

      // NOTE: Mock user id=1 for now
      const result = await query(
        `SELECT f.id, f.user_id, f.attraction_id, f.created_at,
                a.slug, a.name, a.type, a.city, a.short_description,
                COALESCE((SELECT url FROM photos p WHERE p.attraction_id = a.id AND p.is_cover = true ORDER BY p.id DESC LIMIT 1), NULL) AS cover_image
         FROM favorites f
         JOIN attractions a ON a.id = f.attraction_id
         WHERE f.user_id = $1
         ORDER BY f.created_at DESC
         LIMIT 100`,
        [1]
      );

      const favorites = result.rows.map((r) => ({
        id: r.id,
        user_id: r.user_id,
        attraction_id: r.attraction_id,
        created_at: r.created_at,
        attraction: {
          id: r.attraction_id,
          slug: r.slug,
          name: r.name,
          type: r.type,
          city: r.city,
          short_description: r.short_description,
          image: r.cover_image,
        },
      }));

      return res.status(200).json({ success: true, favorites });
    } catch (error) {
      console.error("Get favorites error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    // Add to favorites
    try {
      const { attraction_id } = req.body;

      if (!attraction_id) {
        return res.status(400).json({ message: "Attraction ID is required" });
      }

      if (!hasDatabase()) {
        const mockFavorite = {
          id: Math.floor(Math.random() * 10000),
          user_id: 1,
          attraction_id,
          created_at: new Date().toISOString(),
        };
        return res
          .status(201)
          .json({
            success: true,
            message: "Added to favorites",
            favorite: mockFavorite,
          });
      }

      const result = await query(
        `INSERT INTO favorites (user_id, attraction_id) VALUES ($1, $2) RETURNING *`,
        [1, attraction_id]
      );
      return res
        .status(201)
        .json({
          success: true,
          message: "Added to favorites",
          favorite: result.rows[0],
        });
    } catch (error) {
      console.error("Add favorite error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    // Remove from favorites
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Favorite ID is required" });
      }

      if (!hasDatabase()) {
        return res
          .status(200)
          .json({ success: true, message: "Removed from favorites" });
      }
      await query(`DELETE FROM favorites WHERE id = $1`, [id]);
      return res
        .status(200)
        .json({ success: true, message: "Removed from favorites" });
    } catch (error) {
      console.error("Remove favorite error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
