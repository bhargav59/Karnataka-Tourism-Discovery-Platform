// User login endpoint
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // TODO: Add database integration
    // - Find user by email
    // - Compare password with bcrypt
    // - Generate JWT token

    // Mock response for now
    const mockUser = {
      id: 1,
      name: "Test User",
      email,
      role: "user",
      avatar_url: null,
      bio: null,
    };

    const mockToken = "mock_jwt_token_" + mockUser.id;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: mockUser,
      token: mockToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
