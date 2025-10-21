import Head from "next/head";

export default function QuirkyPlaces() {
  // Mock data for quirky places
  const quirkyPlaces = [
    {
      id: 1,
      name: "Innovation Gallery",
      location: "Bangalore",
      description:
        "A unique gallery showcasing local innovations and inventions.",
      image: "https://placehold.co/400x300",
      rating: 4.3,
    },
    {
      id: 2,
      name: "Wonderla Amusement Park",
      location: "Bangalore",
      description:
        "One of India's best amusement parks with over 60 rides and attractions.",
      image: "https://placehold.co/400x300",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Art Gallery",
      location: "Bangalore",
      description:
        "Contemporary art gallery featuring works by local and international artists.",
      image: "https://placehold.co/400x300",
      rating: 4.4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Quirky Places - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Discover unique and offbeat attractions in Karnataka"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quirky Places in Karnataka
          </h1>
          <p className="text-gray-600">
            Discover unique and offbeat attractions that make Karnataka special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quirkyPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{place.name}</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                    Quirky
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{place.location}</p>
                <p className="text-gray-700 mb-4">{place.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">
                    ★ {place.rating}
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
