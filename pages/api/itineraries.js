// Itineraries endpoint - CRUD operations
export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (req.method === "GET") {
    // Get user's itineraries or single itinerary
    const { id } = req.query;

    if (id) {
      // Get single itinerary
      try {
        // TODO: Fetch from database
        const mockItinerary = {
          id: parseInt(id),
          user_id: 1,
          title: "Bangalore Temple Tour",
          description:
            "A perfect weekend temple circuit covering 5 famous temples",
          is_public: true,
          attractions: [
            {
              id: 1,
              name: "ISKCON Temple",
              slug: "iskcon-temple",
              order: 1,
            },
            {
              id: 2,
              name: "Bull Temple",
              slug: "bull-temple",
              order: 2,
            },
          ],
          created_at: "2025-10-15T10:00:00Z",
          updated_at: "2025-10-15T10:00:00Z",
        };

        return res.status(200).json({
          success: true,
          itinerary: mockItinerary,
        });
      } catch (error) {
        console.error("Get itinerary error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    } else {
      // Get all user's itineraries (requires auth)
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        // TODO: Fetch from database
        const mockItineraries = [
          {
            id: 1,
            user_id: 1,
            title: "Bangalore Temple Tour",
            description: "A perfect weekend temple circuit",
            is_public: true,
            attractions_count: 5,
            created_at: "2025-10-15T10:00:00Z",
          },
        ];

        return res.status(200).json({
          success: true,
          itineraries: mockItineraries,
        });
      } catch (error) {
        console.error("Get itineraries error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  } else if (req.method === "POST") {
    // Create new itinerary
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { title, description, is_public, attractions } = req.body;

      if (!title || !attractions || attractions.length === 0) {
        return res
          .status(400)
          .json({ message: "Title and attractions are required" });
      }

      // TODO: Save to database
      const mockItinerary = {
        id: Math.floor(Math.random() * 10000),
        user_id: 1,
        title,
        description: description || "",
        is_public: is_public || false,
        attractions_order_json: attractions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return res.status(201).json({
        success: true,
        message: "Itinerary created successfully",
        itinerary: mockItinerary,
      });
    } catch (error) {
      console.error("Create itinerary error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    // Update itinerary
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id, title, description, is_public, attractions } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Itinerary ID is required" });
      }

      // TODO: Update in database (check user owns the itinerary)

      return res.status(200).json({
        success: true,
        message: "Itinerary updated successfully",
      });
    } catch (error) {
      console.error("Update itinerary error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    // Delete itinerary
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Itinerary ID is required" });
      }

      // TODO: Delete from database (check user owns the itinerary)

      return res.status(200).json({
        success: true,
        message: "Itinerary deleted successfully",
      });
    } catch (error) {
      console.error("Delete itinerary error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
