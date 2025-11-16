import Head from "next/head";
import Link from "next/link";

export default function Blog() {
  // Mock blog posts data
  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Bangalore Temples",
      excerpt:
        "Discover the spiritual heritage of Bangalore with our comprehensive guide to the city's most significant temples.",
      date: "2023-06-15",
      author: "Priya Sharma",
      category: "Temples",
      image: "https://placehold.co/800x400",
    },
    {
      id: 2,
      title: "10 Quirky Places You Must Visit in Karnataka",
      excerpt:
        "Explore the unusual and fascinating attractions that make Karnataka unique beyond its famous landmarks.",
      date: "2023-05-28",
      author: "Rajesh Kumar",
      category: "Quirky Places",
      image: "https://placehold.co/800x400",
    },
    {
      id: 3,
      title: "Weekend Getaways from Bangalore",
      excerpt:
        "Planning a quick escape from the city? Here are our top picks for memorable weekend trips.",
      date: "2023-05-12",
      author: "Anita Desai",
      category: "Travel Guides",
      image: "https://placehold.co/800x400",
    },
    {
      id: 4,
      title: "The Architecture of Mysore Palaces",
      excerpt:
        "A deep dive into the stunning architectural styles that define the palaces of Mysore.",
      date: "2023-04-30",
      author: "Vikram Patel",
      category: "Architecture",
      image: "https://placehold.co/800x400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Blog - Karnataka Tourism Discovery</title>
        <meta
          name="description"
          content="Travel guides, tips, and stories about Karnataka"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Travel Blog</h1>
          <p className="text-gray-600">
            Guides, tips, and stories about exploring Karnataka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            <a href="#" className="px-3 py-1 rounded bg-blue-600 text-white">
              1
            </a>
            <a href="#" className="px-3 py-1 rounded hover:bg-gray-200">
              2
            </a>
            <a href="#" className="px-3 py-1 rounded hover:bg-gray-200">
              3
            </a>
            <a href="#" className="px-3 py-1 rounded hover:bg-gray-200">
              Next →
            </a>
          </nav>
        </div>
      </main>
    </div>
  );
}
