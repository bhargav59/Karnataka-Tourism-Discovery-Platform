import Head from "next/head";
import { useRouter } from "next/router";

export default function AttractionDetail() {
  const router = useRouter();
  const { slug } = router.query;

  // Mock data for a single attraction
  const attraction = {
    id: 1,
    name: "ISKCON Temple",
    name_kannada: "ఐఎస్కాన్ దేవాలయం",
    location: "Bangalore",
    type: "temple",
    description:
      "The ISKCON Temple in Bangalore, also known as the Sri Sri Radha Krishna Temple, is one of the largest temples in India dedicated to Lord Krishna. Established in 1997, this beautiful temple complex features stunning architecture with white marble and red stone. The temple is not only a spiritual center but also a cultural hub that promotes Vedic knowledge and values.",
    history:
      "The temple was established in 1997 by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada's disciples. The temple complex was built with the vision of creating a spiritual and cultural center that would help people reconnect with their spiritual roots. The architecture combines traditional Indian temple design with modern construction techniques.",
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
    photos: [
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
    ],
    rating: 4.8,
    reviews: 124,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{attraction?.name} - Karnataka Tourism Discovery</title>
        <meta name="description" content={attraction?.description} />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {attraction ? (
          <>
            <div className="mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                ← Back to Attractions
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                {attraction.name}
              </h1>
              <p className="text-gray-600">{attraction.name_kannada}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <img
                    src={attraction.photos[0]}
                    alt={attraction.name}
                    className="w-full h-96 object-cover"
                  />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-700 mb-4">{attraction.description}</p>
                  <p className="text-gray-700">{attraction.history}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {attraction.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${attraction.name} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500 text-2xl font-bold mr-2">
                      ★ {attraction.rating}
                    </span>
                    <span className="text-gray-600">
                      ({attraction.reviews} reviews)
                    </span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Write a Review
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h2 className="text-xl font-bold mb-4">Information</h2>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Timings</h3>
                    <ul className="space-y-1">
                      {Object.entries(attraction.timings).map(([day, time]) => (
                        <li key={day} className="flex justify-between">
                          <span className="capitalize">{day}:</span>
                          <span>{time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Details</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Entry Fee:</span>
                        <span className="font-medium">
                          {attraction.entryFee}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Parking:</span>
                        <span className="font-medium">
                          {attraction.parking}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Accessibility:</span>
                        <span className="font-medium">
                          {attraction.accessibility}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Best Time:</span>
                        <span className="font-medium">
                          {attraction.bestTime}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">
                          {attraction.duration}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Contact</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Phone:</span>{" "}
                        {attraction.contact.phone}
                      </li>
                      <li>
                        <span className="font-medium">Email:</span>{" "}
                        {attraction.contact.email}
                      </li>
                      <li>
                        <span className="font-medium">Website:</span>{" "}
                        {attraction.contact.website}
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Get Directions
                    </button>
                    <button className="border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      Save to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Loading attraction details...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
