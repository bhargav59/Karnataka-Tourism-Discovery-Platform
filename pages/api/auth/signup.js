// User signup endpoint
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // TODO: Add database integration
    // - Check if user already exists
    // - Hash password with bcrypt
    // - Create user in database
    // - Generate JWT token

    // Mock response for now
    const mockUser = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      role: "user",
      created_at: new Date().toISOString(),
    };

    const mockToken = "mock_jwt_token_" + mockUser.id;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: mockUser,
      token: mockToken,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
