import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Discover Karnataka's diverse attractions"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Discover Karnataka
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your guide to Karnataka's spiritual, cultural, and quirky
            attractions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Temples</h2>
            <p className="text-gray-600 mb-4">
              Explore ancient temples with detailed information on timings,
              prasadam, and festivals.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Browse Temples
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Quirky Places
            </h2>
            <p className="text-gray-600 mb-4">
              Discover unique and offbeat attractions that make Karnataka
              special.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Explore Quirky Places
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              Modern Attractions
            </h2>
            <p className="text-gray-600 mb-4">
              Find contemporary landmarks, museums, and cultural centers.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
              See Modern Attractions
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Plan Your Journey
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Where are you going?"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
            <p className="text-center text-gray-600">
              Search for temples, quirky places, or modern attractions in
              Karnataka
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Karnataka Tourism Discovery. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
