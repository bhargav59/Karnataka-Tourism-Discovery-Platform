// Fetch photos for a place using Google Places API
// Usage: GET /api/google/photos?query=ISKCON%20Temple%20Bangalore

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ message: "Google Maps API key not configured" });
  }

  const { query, max = 6, lat, lng } = req.query;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "query is required" });
  }

  try {
    // Step 1: Find place from text (optionally with location bias)
    const findUrl = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
    findUrl.searchParams.set("input", query);
    findUrl.searchParams.set("inputtype", "textquery");
    findUrl.searchParams.set("fields", "place_id");
    findUrl.searchParams.set("key", apiKey);
    if (lat && lng) {
      findUrl.searchParams.set("locationbias", `point:${lat},${lng}`);
    }

    const findResp = await fetch(findUrl.toString());
    const findData = await findResp.json();
    if (!findResp.ok || findData.status !== "OK" || !findData.candidates?.[0]?.place_id) {
      return res.status(200).json({ success: true, items: [] });
    }

    const placeId = findData.candidates[0].place_id;

    // Step 2: Get place details with photos
    const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    detailsUrl.searchParams.set("place_id", placeId);
    detailsUrl.searchParams.set("fields", "name,photos");
    detailsUrl.searchParams.set("key", apiKey);

    const detResp = await fetch(detailsUrl.toString());
    const detData = await detResp.json();
    if (!detResp.ok || detData.status !== "OK") {
      return res.status(200).json({ success: true, items: [] });
    }

    const photos = detData.result?.photos || [];
    const limit = Math.min(parseInt(max as string, 10) || 6, 10);
    const items = photos.slice(0, limit).map((p) => {
      const photoUrl = new URL("https://maps.googleapis.com/maps/api/place/photo");
      photoUrl.searchParams.set("maxwidth", String(Math.min(p.width || 1600, 1600)));
      photoUrl.searchParams.set("photo_reference", p.photo_reference);
      photoUrl.searchParams.set("key", apiKey);
      return {
        url: photoUrl.toString(),
        width: p.width,
        height: p.height,
        attributions: p.html_attributions || [],
      };
    });

    // Note: Respect Google Places Photos TOS: show attributions and do not store/rehost photos.
    return res.status(200).json({ success: true, items });
  } catch (err) {
    console.error("Google photos error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
