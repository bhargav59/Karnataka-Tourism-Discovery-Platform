import Head from "next/head";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Learn about Karnataka Tourism Discovery platform"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            About Karnataka Tourism Discovery
          </h1>
          <p className="text-gray-600">
            Your guide to exploring the rich heritage of Karnataka
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Karnataka Tourism Discovery is dedicated to helping travelers,
            pilgrims, and local explorers discover, plan, and experience
            Karnataka's rich tapestry of spiritual, cultural, and quirky
            attractions through comprehensive, user-generated, and curated
            content.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-bold mb-2">Comprehensive Database</h3>
              <p className="text-gray-700">
                Single source of truth for Karnataka attractions, from ancient
                temples to modern landmarks.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-bold mb-2">Hybrid Discovery</h3>
              <p className="text-gray-700">
                Unique combination of spiritual, cultural, and quirky
                attractions in one platform.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-bold mb-2">Practical Information</h3>
              <p className="text-gray-700">
                Real-time timings, prasadam info, parking, and accessibility
                details for each attraction.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-xl font-bold mb-2">Community Driven</h3>
              <p className="text-gray-700">
                User reviews, photos, and tips to help you make informed
                decisions about your visits.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            We envision creating the definitive digital platform for discovering
            Karnataka's diverse attractions - from ancient temples and
            pilgrimage sites to modern quirky landmarks and offbeat experiences.
            This platform serves as the "RoadsideAmerica.com meets Temple Guide"
            for Karnataka.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions, suggestions, or want to contribute content? We'd
            love to hear from you!
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-gray-700">info@karnatakatourism.com</p>

              <h3 className="text-lg font-bold mb-2 mt-4">Address</h3>
              <p className="text-gray-700">
                Karnataka Tourism Discovery
                <br />
                Bangalore, Karnataka
                <br />
                India
              </p>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-lg font-bold mb-2">Social Media</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Facebook
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  Twitter
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-800">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
