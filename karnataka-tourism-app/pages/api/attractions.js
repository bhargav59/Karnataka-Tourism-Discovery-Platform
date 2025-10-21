// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
function handler(req, res) {
  // Mock data for attractions
  const attractions = [
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

  if (req.method === "GET") {
    res.status(200).json(attractions);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

module.exports = handler;
