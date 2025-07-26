import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { FiUser } from "react-icons/fi";

const PostListItems = ({ post }) => {
  const username = post.user?.username || "Unknown Author";
  const category = post.category || "General";
  const createdAt = post.createdAt || new Date();

  return (
    <div className="group flex flex-col xl:flex-row gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border transition-all duration-300">
      {/* Post Image */}
      {post.img && (
        <Link to={`/${post.slug}`} className="w-full xl:w-1/3">
          <img
            src={post.img}
            alt={post.title}
            className="rounded-2xl object-cover w-full h-[200px] sm:h-[240px] transition-transform group-hover:scale-[1.03]"
          />
        </Link>
      )}

      {/* Post Content */}
      <div className="flex flex-col gap-4 w-full xl:w-2/3">
        {/* Category */}
        <Link
          to={`/posts?cat=${category}`}
          className="self-start bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition"
        >
          {category}
        </Link>

        {/* Title */}
        <Link
          to={`/${post.slug}`}
          className="text-2xl sm:text-3xl font-semibold text-gray-900 hover:text-blue-800 transition"
        >
          {post.title}
        </Link>

        {/* Author and Date */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <FiUser className="text-gray-400" />
          <Link
            className="text-blue-500 hover:underline"
            to={`/posts?author=${username}`}
          >
            {username}
          </Link>
          <span className="text-gray-400">•</span>
          <span>{format(createdAt)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed line-clamp-3">
          {post.desc}
        </p>

        {/* Read More */}
        <Link
          to={`/${post.slug}`}
          className="text-blue-600 text-sm font-medium hover:underline mt-2"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;

