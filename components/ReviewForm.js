import { useState } from "react";

export default function ReviewForm({ attractionId, onSubmitted }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (reviewText.length < 50) {
      setError("Review must be at least 50 characters");
      return;
    }

    setLoading(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          attraction_id: attractionId,
          rating,
          review_text: reviewText,
          visited_date: visitedDate || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setSuccess("Review submitted successfully");
      setReviewText("");
      setVisitedDate("");
      setRating(5);
      if (onSubmitted) onSubmitted(data.review);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      id="write-review"
      onSubmit={handleSubmit}
      className="mt-6 border-t pt-6"
    >
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      {success && <div className="mb-3 text-green-700">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border rounded px-3 py-2 w-full"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{`${r} Stars`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Visited Date
          </label>
          <input
            type="date"
            value={visitedDate}
            onChange={(e) => setVisitedDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Your Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={5}
          placeholder="Share your experience (min 50 characters)"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
