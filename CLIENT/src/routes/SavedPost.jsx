import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { FiBookmark } from "react-icons/fi";

const truncateWords = (text = "", numWords = 5) => {
  return text.split(" ").slice(0, numWords).join(" ") + " ...";
};

const SavedPost = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/saved/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedPosts(
          Array.isArray(res.data) ? res.data : res.data.saved || []
        );
      } catch (err) {
        console.error("Error fetching saved posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-blue-600 text-lg font-medium">
        Loading your saved posts...
      </div>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg text-center px-4">
        You haven’t saved any posts yet.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8 text-center">
        <FiBookmark className="inline-block mr-2 text-blue-600" />
        Your Saved Posts
      </h1>

      <div className="space-y-8">
        {savedPosts.map((post, index) => {
          const category = post?.category || "General";
          const title = truncateWords(post?.title || "Untitled Post", 12);
          const desc = truncateWords(post?.desc || "Read more...", 20);

          return (
            <motion.div
              key={post._id}
              className="flex flex-col sm:flex-row justify-between gap-4 group cursor-pointer border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image */}
              <motion.div
                className="w-full sm:w-1/2 md:w-1/3 aspect-video overflow-hidden rounded-l-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.img
                  src={post.img || "https://via.placeholder.com/800x450.png?text=No+Image"}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-l-xl"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                className="flex-1 p-4 sm:p-5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                {/* Category and Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Link
                    to={`/posts?cat=${category}`}
                    className="text-blue-600 hover:text-blue-800 transition duration-300 font-medium"
                  >
                    {category}
                  </Link>
                  <span className="text-gray-400">• {format(post.createdAt)}</span>
                </div>

                {/* Title */}
                <Link
                  to={`/${post.slug}`}
                  className="block text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors duration-300"
                >
                  <span className="line-clamp-2">{title}</span>
                </Link>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {desc}
                </p>

                {/* Bottom underline hover */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-3"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedPost;



