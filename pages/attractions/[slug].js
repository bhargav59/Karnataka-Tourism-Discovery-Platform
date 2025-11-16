import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReviewForm from "../../components/ReviewForm";

export default function AttractionDetail({ attraction, notFound }) {
  const router = useRouter();
  const { slug } = router.query;
  const [externalPhotos, setExternalPhotos] = useState([]);
  const [loadingExternal, setLoadingExternal] = useState(false);

  // If no local photos, try fetching Google Place photos (non-persistent, with attribution)
  useEffect(() => {
    let mounted = true;
    async function loadGooglePhotos() {
      if (
        !attraction ||
        (Array.isArray(attraction.photos) && attraction.photos.length > 0)
      )
        return;
      const qParts = [
        attraction?.name,
        attraction?.city,
        attraction?.district,
        "Karnataka",
      ].filter(Boolean);
      if (qParts.length === 0) return;
      setLoadingExternal(true);
      try {
        const res = await fetch(
          `/api/google/photos?query=${encodeURIComponent(
            qParts.join(" ")
          )}&max=6`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setExternalPhotos(data.items || []);
      } finally {
        if (mounted) setLoadingExternal(false);
      }
    }
    loadGooglePhotos();
    return () => {
      mounted = false;
    };
  }, [attraction]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>
          {attraction?.name || "Attraction"} - Karnataka Tourism Discovery
        </title>
        <meta
          name="description"
          content={attraction?.description || "Attraction details"}
        />
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
              {attraction.name_kannada && (
                <p className="text-gray-600">{attraction.name_kannada}</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  {Array.isArray(attraction.photos) &&
                  attraction.photos.length > 0 ? (
                    <img
                      src={attraction.photos[0].url || attraction.photos[0]}
                      alt={attraction.name}
                      className="w-full h-96 object-cover"
                    />
                  ) : externalPhotos.length > 0 ? (
                    <img
                      src={externalPhotos[0].url}
                      alt={attraction.name}
                      className="w-full h-96 object-cover"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                      {loadingExternal
                        ? "Loading photos..."
                        : "No images available"}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  {attraction.description && (
                    <p className="text-gray-700 mb-4">
                      {attraction.description}
                    </p>
                  )}
                  {attraction.history && (
                    <p className="text-gray-700">{attraction.history}</p>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(attraction.photos || []).map((photo, index) => {
                      const src = photo.url || photo;
                      return (
                        <img
                          key={`local-${index}`}
                          src={src}
                          alt={`${attraction.name} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      );
                    })}
                    {(!attraction.photos || attraction.photos.length === 0) &&
                      externalPhotos.map((p, index) => (
                        <div key={`ext-${index}`} className="relative">
                          <img
                            src={p.url}
                            alt={`${attraction.name} (photo ${index + 1})`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {Array.isArray(p.attributions) &&
                            p.attributions.length > 0 && (
                              <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-[10px] p-1 rounded">
                                <span>Photo: </span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: p.attributions.join(" "),
                                  }}
                                />
                              </div>
                            )}
                        </div>
                      ))}
                  </div>
                  {(!attraction.photos || attraction.photos.length === 0) &&
                    externalPhotos.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Images shown via Google Places Photos API. Attributions
                        included as required.
                      </p>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                  {/* Reviews summary placeholder; detailed reviews wired in later */}
                  {attraction.rating && (
                    <div className="flex items-center mb-4">
                      <span className="text-yellow-500 text-2xl font-bold mr-2">
                        ★ {attraction.rating}
                      </span>
                      <span className="text-gray-600">
                        ({attraction.reviews || 0} reviews)
                      </span>
                    </div>
                  )}
                  <a
                    href={`#write-review`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    Write a Review
                  </a>
                  <ReviewForm attractionId={attraction.id} />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h2 className="text-xl font-bold mb-4">Information</h2>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Timings</h3>
                    <ul className="space-y-1">
                      {Object.entries(attraction.timings || {}).map(
                        ([day, time]) => (
                          <li key={day} className="flex justify-between">
                            <span className="capitalize">{day}:</span>
                            <span>{time}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Details</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Entry Fee:</span>
                        <span className="font-medium">
                          {attraction.entryFee || "-"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Parking:</span>
                        <span className="font-medium">
                          {attraction.parking || "-"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Accessibility:</span>
                        <span className="font-medium">
                          {attraction.accessibility || "-"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Best Time:</span>
                        <span className="font-medium">
                          {attraction.bestTime || "-"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">
                          {attraction.duration || "-"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Contact</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Phone:</span>{" "}
                        {attraction.contact?.phone || "-"}
                      </li>
                      <li>
                        <span className="font-medium">Email:</span>{" "}
                        {attraction.contact?.email || "-"}
                      </li>
                      <li>
                        <span className="font-medium">Website:</span>{" "}
                        {attraction.contact?.website || "-"}
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        attraction.address || attraction.name
                      )}${
                        attraction.location_lat && attraction.location_lng
                          ? `&destination_place_id=&travelmode=driving`
                          : ""
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
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

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    const res = await fetch(
      `${baseUrl}/api/attractions?slug=${encodeURIComponent(slug)}`
    );
    if (!res.ok) {
      return { notFound: true };
    }
    const data = await res.json();
    return {
      props: {
        attraction: data.attraction || null,
        notFound: false,
      },
    };
  } catch (e) {
    return { props: { attraction: null, notFound: true } };
  }
}
