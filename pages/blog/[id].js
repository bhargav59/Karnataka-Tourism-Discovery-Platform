import Head from "next/head";
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  // Mock blog post data
  const post = {
    id: 1,
    title: "The Ultimate Guide to Bangalore Temples",
    date: "June 15, 2023",
    author: "Priya Sharma",
    category: "Temples",
    image: "https://placehold.co/800x400",
    content: `
      <p>Bangalore, the Silicon Valley of India, is not just about IT parks and bustling streets. The city has a rich spiritual heritage with numerous temples that offer a peaceful retreat from the urban chaos. In this comprehensive guide, we'll take you through the most significant temples in Bangalore that you must visit.</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-3">1. ISKCON Temple</h2>
      <p>The ISKCON Temple in Bangalore, also known as the Sri Sri Radha Krishna Temple, is one of the largest temples in India dedicated to Lord Krishna. Established in 1997, this beautiful temple complex features stunning architecture with white marble and red stone. The temple is not only a spiritual center but also a cultural hub that promotes Vedic knowledge and values.</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-3">2. Bull Temple (Nandi Temple)</h2>
      <p>Located in Basavanagudi, the Bull Temple is dedicated to Nandi, the sacred bull and vehicle of Lord Shiva. The temple houses a massive monolithic statue of Nandi, carved from a single stone, measuring 15 feet in height and 20 feet in length. The temple is an excellent example of Vijayanagara architecture and is a popular spot for both locals and tourists.</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-3">3. Gavi Gangadhareshwara Temple</h2>
      <p>This ancient cave temple, dating back to the 16th century, is dedicated to Lord Shiva. What makes this temple unique is its architectural marvel - during the Makar Sankranti festival, the sun's rays pass through an opening in the rock and illuminate the Shiva Linga inside the cave. The temple showcases the brilliance of ancient Indian rock-cut architecture.</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-3">4. Banashankari Temple</h2>
      <p>Dedicated to Goddess Banashankari, an incarnation of Goddess Parvati, this temple is located in the Banashankari locality of Bangalore. The temple attracts a large number of devotees, especially during the annual Banashankari Jatre (fair). The temple's architecture reflects the Dravidian style with its towering gopuram (gateway tower).</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-3">5. Shiva Temple (Dodda Ganapathi)</h2>
      <p>Located in Rajajinagar, this temple is famous for its massive monolithic statue of Lord Ganesha, locally known as Dodda Ganapathi (Big Ganesha). The 18-foot tall statue is carved from a single stone and is one of the largest monolithic Ganesha statues in the world.</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-3">Tips for Visiting Temples in Bangalore</h2>
      <ul class="list-disc list-inside ml-4 mt-3">
        <li>Dress modestly and remove footwear before entering the temple premises</li>
        <li>Check temple timings as they may vary on special occasions and festivals</li>
        <li>Carry a water bottle and wear comfortable footwear</li>
        <li>Respect the religious sentiments of other devotees</li>
        <li>Photography may be restricted inside the temple premises</li>
      </ul>
      
      <p className="mt-4">Whether you're a devout pilgrim or a curious traveler, Bangalore's temples offer a glimpse into the city's spiritual soul. Each temple has its own unique story and architectural beauty, making them must-visit destinations for anyone exploring the Garden City.</p>
    `,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{post?.title} - Karnataka Tourism Discovery Blog</title>
        <meta
          name="description"
          content={post?.excerpt || "Read our latest travel blog post"}
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {post ? (
          <>
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              ← Back to Blog
            </button>

            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500">{post.date}</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">{post.author}</p>
                  </div>
                </div>

                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                        Like
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Share
                      </button>
                    </div>
                    <div className="text-gray-500 text-sm">
                      24 likes • 8 comments
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div className="mt-8 bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Comments</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    <div className="ml-2">
                      <p className="font-medium">Arun Kumar</p>
                      <p className="text-gray-500 text-sm">June 16, 2023</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great guide! I've been to ISKCON and Bull Temple, but now
                    I'm excited to visit the others on this list.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    <div className="ml-2">
                      <p className="font-medium">Meera Patel</p>
                      <p className="text-gray-500 text-sm">June 18, 2023</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Thanks for the detailed information. The architectural
                    descriptions are very helpful for planning visits.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-2">Leave a Comment</h4>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Share your thoughts..."
                ></textarea>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading blog post...</p>
          </div>
        )}
      </main>
    </div>
  );
}
