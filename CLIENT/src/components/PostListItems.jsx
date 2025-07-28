import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { motion } from "framer-motion";

const PostListItem = ({ post }) => {
  const username = post?.user?.username || "Unknown Author";
  const category = post?.category || "General";
  const createdAt = post?.createdAt || new Date();
  const desc = post?.desc?.slice(0, 160) + "...";
  const title = post?.title || "Untitled Post";
  const comments = post?.comments?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-row gap-3 md:gap-4 lg:gap-5 bg-white rounded-2xl shadow-md p-3 md:p-4 lg:p-5 hover:shadow-lg transition duration-300 border-2 border-blue-200"
    >
      {/* Image on the Left - Always horizontal, smaller for mobile */}
      <Link
        to={`/${post.slug}`}
        className="w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 2xl:w-52 h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 overflow-hidden rounded-xl flex-shrink-0 self-start"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={post.img}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </Link>

      {/* Content on the Right */}
      <div className="flex flex-col justify-between flex-1 text-left min-w-0">
        {/* Date + Category */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between text-xs md:text-sm text-gray-500 mb-1 md:mb-2 gap-1 sm:gap-2">
          <span className="flex-shrink-0 text-xs">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long", 
              day: "numeric",
            })}{" "}
            • 2 min read
          </span>
          <Link
            to={`/posts?cat=${category}`}
            className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full hover:bg-blue-200 transition flex-shrink-0 self-start"
          >
            {category}
          </Link>
        </div>

        {/* Title */}
        <Link to={`/${post.slug}`} className="block mb-1 md:mb-2">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 hover:text-purple-700 transition leading-tight line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Description - Hidden on very small screens */}
        <p className="hidden sm:block text-gray-700 text-xs md:text-sm lg:text-base mb-2 md:mb-3 leading-relaxed flex-grow line-clamp-2 md:line-clamp-3">
          {desc}
        </p>

        {/* Author & Comments */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span className="truncate mr-3">By {username}</span>
          <span className="flex-shrink-0">{comments} comments</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostListItem;



