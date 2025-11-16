// Next.js API route for attractions: list and by-slug
const { query, hasDatabase } = require("../../lib/db/connection");

async function handler(req, res) {
  // Mock data for attractions (fallback when DB not configured)
  const mockAttractions = [
    {
      id: 1,
      slug: "iskcon-temple",
      name: "ISKCON Temple",
      name_kannada: "ఐఎస్కాన్ దేవాలయం",
      location: "Bangalore",
      type: "temple",
      category: "religious",
      description:
        "A beautiful temple dedicated to Lord Krishna with stunning architecture.",
      district: "Bangalore Urban",
      city: "Bangalore",
      state: "Karnataka",
      timings: {
        monday: "7:00 AM - 8:00 PM",
        tuesday: "7:00 AM - 8:00 PM",
        wednesday: "7:00 AM - 8:00 PM",
        thursday: "7:00 AM - 8:00 PM",
        friday: "7:00 AM - 8:00 PM",
        saturday: "7:00 AM - 8:00 PM",
        sunday: "7:00 AM - 8:00 PM",
      },
      entryFee: "Free",
      parking: "Available",
      accessibility: "Wheelchair accessible",
      contact: {
        phone: "+91 80 2672 3738",
        email: "info@iskconbangalore.org",
        website: "https://www.iskconbangalore.org",
      },
      bestTime: "Morning (6:00 AM - 10:00 AM) or Evening (5:00 PM - 8:00 PM)",
      duration: "2-3 hours",
      featured: true,
      published: true,
      viewCount: 1250,
      favoriteCount: 87,
    },
    {
      id: 2,
      slug: "bangalore-palace",
      name: "Bangalore Palace",
      name_kannada: "ಬೆಂಗಳೂರು ಪ್ರಾಸಾದ",
      location: "Bangalore",
      type: "modern",
      category: "historical",
      description:
        "A Tudor-style architecture built in 1887, modeled after England's Windsor Castle.",
      district: "Bangalore Urban",
      city: "Bangalore",
      state: "Karnataka",
      timings: {
        monday: "10:00 AM - 5:00 PM",
        tuesday: "10:00 AM - 5:00 PM",
        wednesday: "10:00 AM - 5:00 PM",
        thursday: "10:00 AM - 5:00 PM",
        friday: "10:00 AM - 5:00 PM",
        saturday: "10:00 AM - 5:00 PM",
        sunday: "10:00 AM - 5:00 PM",
      },
      entryFee: "₹230 for Indians, ₹460 for foreigners",
      parking: "Available",
      accessibility: "Partially accessible",
      contact: {
        phone: "+91 80 2223 0362",
        email: "info@bangalorepalace.com",
        website: "https://www.bangalorepalace.com",
      },
      bestTime: "Morning (9:00 AM - 12:00 PM)",
      duration: "2-3 hours",
      featured: true,
      published: true,
      viewCount: 980,
      favoriteCount: 65,
    },
  ];

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { slug, q, type, district, limit = 20, offset = 0 } = req.query;

    // Return single by slug
    if (slug) {
      if (!hasDatabase()) {
        const found = mockAttractions.find((a) => a.slug === slug);
        if (!found) return res.status(404).json({ message: "Not found" });
        return res.status(200).json({ success: true, attraction: found });
      }

      const result = await query(
        `SELECT a.*, td.deity, td.prasadam_info, td.dress_code
         FROM attractions a
         LEFT JOIN temple_details td ON td.attraction_id = a.id
         WHERE a.slug = $1 AND a.published = true
         LIMIT 1`,
        [slug]
      );
      if (result.rowCount === 0)
        return res.status(404).json({ message: "Not found" });

      const attraction = result.rows[0];
      // Fetch photos
      const photos = await query(
        `SELECT * FROM photos WHERE attraction_id = $1 ORDER BY is_cover DESC, order_index ASC, id DESC LIMIT 30`,
        [attraction.id]
      );
      attraction.photos = photos.rows;
      return res.status(200).json({ success: true, attraction });
    }

    // List with optional filters
    if (!hasDatabase()) {
      return res
        .status(200)
        .json({ success: true, attractions: mockAttractions });
    }

    const values = [];
    let where = "WHERE a.published = true";

    if (q) {
      values.push(`%${q}%`);
      where += ` AND (a.name ILIKE $${values.length} OR a.description ILIKE $${values.length})`;
    }
    if (type) {
      values.push(type);
      where += ` AND a.type = $${values.length}`;
    }
    if (district) {
      values.push(district);
      where += ` AND a.district = $${values.length}`;
    }

    values.push(Number(limit));
    values.push(Number(offset));

    const sql = `
      SELECT a.id, a.slug, a.name, a.name_kannada, a.type, a.category,
             a.short_description, a.city, a.district, a.state,
             COALESCE((SELECT url FROM photos p WHERE p.attraction_id = a.id AND p.is_cover = true ORDER BY p.id DESC LIMIT 1), NULL) AS cover_image
      FROM attractions a
      ${where}
      ORDER BY a.featured DESC, a.view_count DESC, a.id DESC
      LIMIT $${values.length - 1} OFFSET $${values.length}
    `;

    const result = await query(sql, values);
    return res.status(200).json({ success: true, attractions: result.rows });
  } catch (error) {
    if (error && error.code === "NO_DB") {
      return res
        .status(200)
        .json({
          success: true,
          attractions: mockAttractions,
          note: "DB not configured; showing mock data.",
        });
    }
    console.error("Attractions API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = handler;
