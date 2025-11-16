// Search attractions endpoint
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { q, type, district, category } = req.query;

    // TODO: Implement database search with filters
    // - Full-text search on name, description
    // - Filter by type, district, category
    // - Pagination

    // Mock data for now
    const mockResults = [
      {
        id: 1,
        slug: "iskcon-temple",
        name: "ISKCON Temple",
        name_kannada: "ಇಸ್ಕಾನ್ ದೇವಸ್ಥಾನ",
        type: "temple",
        category: "religious",
        short_description: "A beautiful temple dedicated to Lord Krishna",
        city: "Bangalore",
        district: "Bangalore Urban",
        featured: true,
      },
      {
        id: 2,
        slug: "bangalore-palace",
        name: "Bangalore Palace",
        name_kannada: "ಬೆಂಗಳೂರು ಅರಮನೆ",
        type: "modern",
        category: "historical",
        short_description: "Tudor-style architecture from 1887",
        city: "Bangalore",
        district: "Bangalore Urban",
        featured: true,
      },
    ];

    // Simple filtering based on query
    let results = mockResults;
    if (q) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.short_description.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (type) {
      results = results.filter((item) => item.type === type);
    }
    if (district) {
      results = results.filter((item) => item.district === district);
    }
    if (category) {
      results = results.filter((item) => item.category === category);
    }

    return res.status(200).json({
      success: true,
      query: q || "",
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
