import { useState } from "react";
import Image from "next/image";

export default function ReviewCard({ review, onHelpful }) {
  const [showFullReview, setShowFullReview] = useState(false);

  const { user, rating, review_text, visited_date, helpful_count, created_at } =
    review;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4">
      {/* User Info */}
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="ml-3 flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{user.name}</h4>
              <div className="flex items-center mt-1">
                {/* Star Rating */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {formatDate(created_at)}
                </span>
              </div>
            </div>

            {visited_date && (
              <div className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-md">
                ✓ Visited {formatDate(visited_date)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-line">
          {showFullReview || review_text.length <= 300
            ? review_text
            : `${review_text.substring(0, 300)}...`}
        </p>
        {review_text.length > 300 && (
          <button
            onClick={() => setShowFullReview(!showFullReview)}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            {showFullReview ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Review Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden"
            >
              <Image
                src={photo}
                alt={`Review photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Helpful Button */}
      <div className="flex items-center pt-4 border-t border-gray-200">
        <button
          onClick={() => onHelpful && onHelpful(review.id)}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span className="text-sm">Helpful ({helpful_count})</span>
        </button>
      </div>
    </div>
  );
}
