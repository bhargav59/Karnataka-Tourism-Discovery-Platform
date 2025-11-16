import Head from "next/head";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Travel enthusiast exploring the beauty of Karnataka",
    joinDate: "January 2023",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [favorites, setFavorites] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loadingFollowing, setLoadingFollowing] = useState(true);
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [unfollowBusy, setUnfollowBusy] = useState({});

  useEffect(() => {
    let mounted = true;
    async function loadFavorites() {
      setLoadingFavs(true);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch("/api/favorites", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setFavorites(data.favorites || []);
      } finally {
        if (mounted) setLoadingFavs(false);
      }
    }
    async function loadFollowing() {
      setLoadingFollowing(true);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch("/api/follow?list=following", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          if (mounted) setFollowing(data.users || []);
        }
      } finally {
        if (mounted) setLoadingFollowing(false);
      }
    }

    async function loadFeed() {
      setLoadingFeed(true);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch("/api/feed", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          if (mounted) setFeed(data.items || []);
        }
      } finally {
        if (mounted) setLoadingFeed(false);
      }
    }

    loadFavorites();
    loadFollowing();
    loadFeed();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setEditing(false);
  };

  async function handleUnfollow(userId) {
    try {
      setUnfollowBusy((s) => ({ ...s, [userId]: true }));
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(
        `/api/follow?target_user_id=${encodeURIComponent(userId)}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (res.ok) {
        setFollowing((list) => list.filter((u) => u.user_id !== userId));
      }
    } finally {
      setUnfollowBusy((s) => ({ ...s, [userId]: false }));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Profile - Karnataka Tourism Discovery</title>
        <meta name="description" content="Your profile information" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mb-8">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({ ...user });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Member Since</h3>
                <p className="text-gray-700">{user.joinDate}</p>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
          {loadingFavs ? (
            <p className="text-gray-600">Loading...</p>
          ) : favorites.length === 0 ? (
            <p className="text-gray-600">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((f) => (
                <a
                  key={f.id}
                  href={`/attractions/${f.attraction.slug}`}
                  className="border rounded-lg overflow-hidden hover:shadow"
                >
                  <div className="h-36 bg-gray-100">
                    {f.attraction.image && (
                      <img
                        src={f.attraction.image}
                        alt={f.attraction.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold">{f.attraction.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {f.attraction.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {f.attraction.short_description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Following</h2>
          {loadingFollowing ? (
            <p className="text-gray-600">Loading...</p>
          ) : following.length === 0 ? (
            <p className="text-gray-600">You are not following anyone yet.</p>
          ) : (
            <ul className="divide-y">
              {following.map((u) => (
                <li
                  key={u.user_id}
                  className="py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-medium">
                        {u.name || `User ${u.user_id}`}
                      </p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnfollow(u.user_id)}
                    disabled={!!unfollowBusy[u.user_id]}
                    className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {unfollowBusy[u.user_id] ? "..." : "Unfollow"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>
          {loadingFeed ? (
            <p className="text-gray-600">Loading...</p>
          ) : feed.length === 0 ? (
            <p className="text-gray-600">
              No recent activity from people you follow.
            </p>
          ) : (
            <ul className="space-y-3">
              {feed.map((item, idx) => (
                <li key={idx} className="border rounded-lg p-3">
                  <div className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">
                      {item.user?.name || `User ${item.user?.id}`}
                    </span>{" "}
                    {item.type === "review" ? (
                      <>
                        reviewed{" "}
                        <a
                          className="text-blue-600 hover:underline"
                          href={`/attractions/${item.attraction?.slug}`}
                        >
                          {item.attraction?.name}
                        </a>
                        {item.rating ? ` (${item.rating}/5)` : ""}
                        {item.review_text ? (
                          <div className="text-sm text-gray-700 mt-1">
                            “{item.review_text}”
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <>
                        favorited{" "}
                        <a
                          className="text-blue-600 hover:underline"
                          href={`/attractions/${item.attraction?.slug}`}
                        >
                          {item.attraction?.name}
                        </a>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
