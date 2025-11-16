import Head from "next/head";
import { useState } from "react";

export default function Favorites() {
  // Mock data for favorite attractions
  const [favorites, setFavorites] = useState([
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
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Favorites - Karnataka Tourism Discovery</title>
        <meta name="description" content="Your saved attractions" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600">
            Your saved attractions for future visits
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((attraction) => (
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
                  <p className="text-gray-700 mb-4">{attraction.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-bold">
                      ★ {attraction.rating}
                    </span>
                    <button
                      onClick={() => removeFavorite(attraction.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-4">
              Start adding attractions to your favorites list
            </p>
            <a
              href="/attractions"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Attractions
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
