import Head from "next/head";
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function SubmitAttraction() {
  const [form, setForm] = useState({
    name: "",
    name_kannada: "",
    type: "temple",
    category: "religious",
    description: "",
    district: "",
    city: "",
    photos: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.description) {
      setError("Name and description are required");
      return;
    }

    setLoading(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");
      setSuccess("Submitted successfully. Awaiting admin approval.");
      setForm({
        name: "",
        name_kannada: "",
        type: "temple",
        category: "religious",
        description: "",
        district: "",
        city: "",
        photos: [],
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Submit an Attraction - Karnataka Tourism Discovery</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Submit an Attraction</h1>
        <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
          {error && <div className="mb-3 text-red-600">{error}</div>}
          {success && <div className="mb-3 text-green-700">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Name (English)
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Name (Kannada)
                </label>
                <input
                  name="name_kannada"
                  value={form.name_kannada}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="temple">Temple</option>
                  <option value="modern">Modern</option>
                  <option value="quirky">Quirky</option>
                  <option value="historical">Historical</option>
                  <option value="nature">Nature</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">
                  District
                </label>
                <input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">
                  City/Town
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-700 mb-2">Photos</label>
              <ImageUpload
                multiple
                existingImages={form.photos}
                onUploadComplete={(img) =>
                  setForm((f) => ({
                    ...f,
                    photos: [...(f.photos || []), img.url],
                  }))
                }
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
