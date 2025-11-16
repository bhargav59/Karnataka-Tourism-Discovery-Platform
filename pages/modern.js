import Head from "next/head";

export default function ModernAttractions() {
  // Mock data for modern attractions
  const modernAttractions = [
    {
      id: 1,
      name: "Bangalore Palace",
      location: "Bangalore",
      description:
        "A Tudor-style architecture built in 1887, modeled after England's Windsor Castle.",
      image: "https://placehold.co/400x300",
      rating: 4.5,
    },
    {
      id: 2,
      name: "UB City",
      location: "Bangalore",
      description:
        "A premium shopping mall with luxury brands, fine dining restaurants, and entertainment options.",
      image: "https://placehold.co/400x300",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Lalbagh Botanical Garden",
      location: "Bangalore",
      description:
        "Historic botanical garden with glass house and numerous rare plants and flowers.",
      image: "https://placehold.co/400x300",
      rating: 4.6,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Modern Attractions - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Explore contemporary landmarks and cultural centers in Karnataka"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Modern Attractions in Karnataka
          </h1>
          <p className="text-gray-600">
            Find contemporary landmarks, museums, and cultural centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modernAttractions.map((attraction) => (
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
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Modern
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {attraction.location}
                </p>
                <p className="text-gray-700 mb-4">{attraction.description}</p>
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
      </main>
    </div>
  );
}
