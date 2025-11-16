import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [searchTerm, setSearchTerm] = useState(q || "");
  const [results, setResults] = useState([]);

  // Mock data for search results
  const mockResults = [
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
      name: "Gavi Gangadhareshwara Temple",
      location: "Bangalore",
      type: "temple",
      description:
        "An ancient cave temple known for its unique rock-cut architecture.",
      image: "https://placehold.co/400x300",
      rating: 4.6,
    },
  ];

  useEffect(() => {
    if (q) {
      setSearchTerm(q);
      // In a real app, this would be an API call
      setResults(
        mockResults.filter(
          (item) =>
            item.name.toLowerCase().includes(q.toLowerCase()) ||
            item.location.toLowerCase().includes(q.toLowerCase()) ||
            item.description.toLowerCase().includes(q.toLowerCase())
        )
      );
    }
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      // In a real app, this would be an API call
      setResults(
        mockResults.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Search - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Search for attractions in Karnataka"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Attractions
          </h1>
          <p className="text-gray-600">
            Find temples, quirky places, and modern attractions in Karnataka
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Search for attractions, locations, or categories..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {searchTerm && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">
              Search Results for "{searchTerm}" ({results.length} found)
            </h2>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{result.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {result.location}
                      </p>
                      <p className="text-gray-700 mb-4">{result.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-500 font-bold">
                          ★ {result.rating}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">Try different search terms</p>
                <a
                  href="/attractions"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Attractions
                </a>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
