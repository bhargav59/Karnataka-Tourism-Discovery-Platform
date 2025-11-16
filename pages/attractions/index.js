import Head from "next/head";

export default function Attractions() {
  // Mock data for attractions
  const attractions = [
    {
      id: 1,
      name: "ISKCON Temple",
      location: "Bangalore",
      type: "temple",
      description:
        "A beautiful temple dedicated to Lord Krishna with stunning architecture.",
      image: "https://placehold.co/400x300",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Bangalore Palace",
      location: "Bangalore",
      type: "modern",
      description:
        "A Tudor-style architecture built in 1887, modeled after England's Windsor Castle.",
      image: "https://placehold.co/400x300",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Wonderla Amusement Park",
      location: "Bangalore",
      type: "modern",
      description:
        "One of India's best amusement parks with over 60 rides and attractions.",
      image: "https://placehold.co/400x300",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Gavi Gangadhareshwara Temple",
      location: "Bangalore",
      type: "temple",
      description:
        "An ancient cave temple known for its unique rock-cut architecture.",
      image: "https://placehold.co/400x300",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Innovation Gallery",
      location: "Bangalore",
      type: "quirky",
      description:
        "A unique gallery showcasing local innovations and inventions.",
      image: "https://placehold.co/400x300",
      rating: 4.3,
    },
    {
      id: 6,
      name: "Tipu Sultan's Palace",
      location: "Bangalore",
      type: "historical",
      description: "Historical palace showcasing the artifacts of Tipu Sultan.",
      image: "https://placehold.co/400x300",
      rating: 4.4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Attractions - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Browse all attractions in Karnataka"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Attractions
          </h1>
          <p className="text-gray-600">
            Discover temples, quirky places, and modern attractions in Karnataka
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Filters</h2>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>All Categories</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Temples</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Modern</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Quirky</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Location</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>All Locations</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Bangalore</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Mysore</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Udupi</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {attractions.length} attractions
              </p>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Sort by: Popularity</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Name</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{attraction.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {attraction.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {attraction.location}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {attraction.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-500 font-bold">
                        ★ {attraction.rating}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
