// Reviews endpoint - Create/Update/Delete/List
export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get reviews for an attraction
    try {
      const { attraction_id } = req.query;

      if (!attraction_id) {
        return res.status(400).json({ message: "Attraction ID is required" });
      }

      // TODO: Fetch from database
      const mockReviews = [
        {
          id: 1,
          attraction_id: parseInt(attraction_id),
          user: {
            id: 1,
            name: "Priya Sharma",
            avatar_url: null,
          },
          rating: 5,
          review_text:
            "Amazing temple with beautiful architecture. The prasadam was delicious!",
          visited_date: "2025-09-15",
          helpful_count: 12,
          created_at: "2025-09-20T10:30:00Z",
        },
        {
          id: 2,
          attraction_id: parseInt(attraction_id),
          user: {
            id: 2,
            name: "Arjun Patel",
            avatar_url: null,
          },
          rating: 4,
          review_text: "Great place to visit. Can get crowded on weekends.",
          visited_date: "2025-10-01",
          helpful_count: 8,
          created_at: "2025-10-05T14:20:00Z",
        },
      ];

      return res.status(200).json({
        success: true,
        reviews: mockReviews,
        count: mockReviews.length,
      });
    } catch (error) {
      console.error("Get reviews error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    // Create a review
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { attraction_id, rating, review_text, visited_date } = req.body;

      // Validation
      if (!attraction_id || !rating || !review_text) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be between 1 and 5" });
      }

      if (review_text.length < 50 || review_text.length > 2000) {
        return res
          .status(400)
          .json({ message: "Review must be between 50 and 2000 characters" });
      }

      // TODO: Save to database
      const mockReview = {
        id: Math.floor(Math.random() * 10000),
        attraction_id,
        user_id: 1,
        rating,
        review_text,
        visited_date: visited_date || null,
        helpful_count: 0,
        created_at: new Date().toISOString(),
      };

      return res.status(201).json({
        success: true,
        message: "Review submitted successfully",
        review: mockReview,
      });
    } catch (error) {
      console.error("Create review error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    // Update a review
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id, rating, review_text } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Review ID is required" });
      }

      // TODO: Update in database (check user owns the review)

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
      });
    } catch (error) {
      console.error("Update review error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    // Delete a review
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Review ID is required" });
      }

      // TODO: Delete from database (check user owns the review)

      return res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      console.error("Delete review error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
