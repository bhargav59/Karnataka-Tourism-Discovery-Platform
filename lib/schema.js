// Generate schema.org structured data for attractions

export function generateAttractionSchema(attraction) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (attraction.type === "temple") {
    return {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: attraction.name,
      description: attraction.description,
      url: `${baseUrl}/attractions/${attraction.slug}`,
      image: attraction.cover_image || `${baseUrl}/images/placeholder.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: attraction.address,
        addressLocality: attraction.city,
        addressRegion: attraction.district,
        postalCode: attraction.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: attraction.location_lat,
        longitude: attraction.location_lng,
      },
      openingHoursSpecification: attraction.timings_json
        ? Object.entries(attraction.timings_json).map(([day, time]) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
            opens: time.split(" - ")[0],
            closes: time.split(" - ")[1],
          }))
        : [],
      touristType: "Religious Tourism",
      isAccessibleForFree: attraction.entry_fee === "Free",
      ...(attraction.contact_phone && {
        telephone: attraction.contact_phone,
      }),
      ...(attraction.contact_email && {
        email: attraction.contact_email,
      }),
      ...(attraction.website_url && {
        sameAs: attraction.website_url,
      }),
    };
  }

  // For modern/quirky attractions
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: attraction.name,
    description: attraction.description,
    url: `${baseUrl}/attractions/${attraction.slug}`,
    image: attraction.cover_image || `${baseUrl}/images/placeholder.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: attraction.address,
      addressLocality: attraction.city,
      addressRegion: attraction.district,
      postalCode: attraction.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: attraction.location_lat,
      longitude: attraction.location_lng,
    },
    ...(attraction.contact_phone && {
      telephone: attraction.contact_phone,
    }),
  };
}

export function generateBreadcrumbSchema(items) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Karnataka Tourism Discovery Platform",
    description:
      "Comprehensive guide to Karnataka's temples, modern attractions, and quirky places",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      "https://facebook.com/karnatakatourism",
      "https://instagram.com/karnatakatourism",
      "https://twitter.com/karnatakatourism",
    ],
  };
}

export function generateReviewSchema(reviews) {
  if (!reviews || reviews.length === 0) return null;

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: averageRating.toFixed(1),
    reviewCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  };
}
