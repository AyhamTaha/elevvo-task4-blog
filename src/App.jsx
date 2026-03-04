import { useState } from "react";
import { posts } from "./data/posts";
import PostCard from "./components/PostCard";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 2;

  // Filtering Logic
  const filteredPosts = posts.filter((post) => {
    const matchTitle = post.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || post.category === category;
    return matchTitle && matchCategory;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-blue-600 text-white p-6 text-center text-3xl font-bold">
        My Personal Blog
      </header>

      <div className="max-w-6xl mx-auto p-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full p-3 mb-4 rounded-lg border"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Categories */}
        <div className="flex gap-4 mb-6">
          {["All", "Tech", "Travel", "Food"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg ${
                category === cat ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => {
                setCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Conditional Rendering */}
        {currentPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;