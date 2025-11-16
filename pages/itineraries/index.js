import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import SEOHead from "../../components/SEOHead";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function Itineraries() {
  const { isAuthenticated, user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItineraries();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchItineraries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/itineraries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItineraries(data.itineraries || []);
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <SEOHead
          title="Plan Your Karnataka Trip"
          description="Create personalized itineraries for your Karnataka tour. Plan your route, optimize your travel time, and discover the best attractions."
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Karnataka Trip
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sign in to create custom itineraries and save your favorite routes
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In to Get Started
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="My Itineraries"
        description="Manage your Karnataka travel itineraries"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Itineraries</h1>
          <Link
            href="/itineraries/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Create New Itinerary
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading itineraries...</p>
          </div>
        ) : itineraries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="h-24 w-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Itineraries Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start planning your Karnataka adventure by creating your first
              itinerary
            </p>
            <Link
              href="/itineraries/create"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Itinerary
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {itineraries.map((itinerary) => (
              <Link
                key={itinerary.id}
                href={`/itineraries/${itinerary.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {itinerary.title}
                  </h3>
                  {itinerary.is_public && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Public
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {itinerary.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{itinerary.attractions_count} stops</span>
                  </div>

                  <span>
                    {new Date(itinerary.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
