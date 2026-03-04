const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{post.description}</p>
        <p className="text-gray-400 text-xs">{post.date}</p>
      </div>
    </div>
  );
};

export default PostCard;