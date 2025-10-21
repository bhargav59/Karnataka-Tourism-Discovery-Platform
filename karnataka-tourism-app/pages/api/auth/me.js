// Get current user endpoint
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.substring(7);

    // TODO: Verify JWT token
    // - Verify token signature
    // - Extract user ID from token
    // - Fetch user from database

    // Mock response for now
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      role: "user",
      avatar_url: null,
      bio: null,
      created_at: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      user: mockUser,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
