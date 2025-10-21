import Head from "next/head";

export default function Temples() {
  // Mock data for temples
  const temples = [
    {
      id: 1,
      name: "ISKCON Temple",
      location: "Bangalore",
      description:
        "A beautiful temple dedicated to Lord Krishna with stunning architecture.",
      image: "https://placehold.co/400x300",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Gavi Gangadhareshwara Temple",
      location: "Bangalore",
      description:
        "An ancient cave temple known for its unique rock-cut architecture.",
      image: "https://placehold.co/400x300",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Shiva Temple",
      location: "Bangalore",
      description:
        "Ancient temple dedicated to Lord Shiva with beautiful sculptures.",
      image: "https://placehold.co/400x300",
      rating: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Temples - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Explore ancient temples in Karnataka"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Temples in Karnataka
          </h1>
          <p className="text-gray-600">
            Discover ancient temples with detailed information on timings,
            prasadam, and festivals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temples.map((temple) => (
            <div
              key={temple.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={temple.image}
                alt={temple.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{temple.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    Temple
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{temple.location}</p>
                <p className="text-gray-700 mb-4">{temple.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">
                    ★ {temple.rating}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
