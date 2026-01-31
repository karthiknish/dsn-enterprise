import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Link from "next/link";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const searchQuery = params?.q || "";
  
  const title = searchQuery 
    ? `Search results for "${searchQuery}" - Blog - DSN Enterprises`
    : "Blog - DSN Enterprises";
    
  const description = "Read our latest articles about precision gauges, measuring instruments, and industrial applications.";

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/blog",
      images: ["/images/featured.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/featured.png"],
    },
  };
}

async function getPublishedPosts() {
  try {
    const postsRef = collection(db, "blogs");
    const q = query(
      postsRef,
      where("status", "==", "published"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      publishedDate: doc.data().publishedDate?.toDate?.()?.toISOString() || null,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;
  const searchQuery = params?.q || "";
  const postsPerPage = 9;

  const allPosts = await getPublishedPosts();
  
  // Filter posts based on search query
  const filteredPosts = searchQuery 
    ? allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPosts;

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-oswald">
              Our Blog
            </h1>
            <p className="text-xl text-green-100">
              Insights, updates, and expertise from DSN Enterprises
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form action="/blog" method="GET" className="relative group">
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search articles by title, content or topic..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <Link 
                  href="/blog"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {searchQuery && (
            <div className="mb-8 max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">
                {totalPosts > 0 
                  ? `Search results for "${searchQuery}" (${totalPosts})`
                  : `No results found for "${searchQuery}"`
                }
              </h2>
              {totalPosts === 0 && (
                <button 
                  onClick={() => window.location.href = '/blog'}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Clear search and show all posts
                </button>
              )}
            </div>
          )}

          {posts.length === 0 && !searchQuery ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No posts yet
              </h2>
              <p className="text-gray-600">
                Check back soon for new articles and updates.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const displayDate = post.publishedDate || post.createdAt;
                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                    >
                      {post.featuredImage && (
                        <Link href={`/blog/${post.slug}`}>
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                        </Link>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-sm text-gray-500 mb-2">
                          {displayDate
                            ? new Date(displayDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "No date"}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                            {post.title}
                          </h2>
                        </Link>
                        {post.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-auto">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                          >
                            Read more
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-green-500 transition-all font-medium"
                    >
                      Previous
                    </Link>
                  )}
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Link
                      key={i + 1}
                      href={`/blog?page=${i + 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                        currentPage === i + 1
                          ? "bg-green-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-green-500"
                      }`}
                    >
                      {i + 1}
                    </Link>
                  ))}

                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-green-500 transition-all font-medium"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
