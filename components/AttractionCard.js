import Link from "next/link";
import Image from "next/image";

export default function AttractionCard({ attraction }) {
  const {
    slug,
    name,
    name_kannada,
    type,
    city,
    district,
    short_description,
    entry_fee,
    rating,
    review_count,
    featured,
  } = attraction;

  // Placeholder image if none provided
  const imageUrl = attraction.cover_image || "/images/placeholder.jpg";

  return (
    <Link href={`/attractions/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            onError={(e) => {
              e.target.src = "/images/placeholder.jpg";
            }}
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              Featured
            </div>
          )}
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold capitalize">
            {type}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
            {name}
          </h3>
          {name_kannada && (
            <p className="text-sm text-gray-500 mb-2">{name_kannada}</p>
          )}

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {city}
              {district && `, ${district}`}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {short_description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {rating && (
                <>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(rating)
                            ? "fill-current"
                            : "fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {review_count && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({review_count})
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="text-sm font-semibold text-blue-600">
              {entry_fee === "Free" || entry_fee === "₹0" ? (
                <span className="text-green-600">Free Entry</span>
              ) : (
                entry_fee
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
