
// import { Link } from "react-router-dom";
// import { format } from "timeago.js";
// import { motion } from "framer-motion";

// // Utility to truncate description
// const truncateLetters = (text = "", numLetters = 25) => {
//   if (text.length <= numLetters) return text;
//   return text.slice(0, numLetters) + " ...";
// };

// const PostListItem = ({ post, index = 0 }) => {
//   const category = post?.category || "General";
//   const desc = truncateLetters(post?.desc || "Read More...");
//   const title = truncateLetters(post?.title || "Untitled Post");

//   return (
//     <motion.div
//       className="flex justify-between gap-6 mb-8 p-4 group cursor-pointer border border-gray-200 rounded-2xl shadow-sm hover:shadow-md bg-white"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: 0.6,
//         delay: index * 0.1,
//         ease: "easeOut",
//       }}
//       whileHover={{
//         y: -6,
//         transition: { duration: 0.3, ease: "easeOut" },
//       }}
//       whileTap={{ scale: 0.98 }}
//     >
//       {/* Image Section with Hovered Category */}
//       <motion.div
//         className="relative w-[45%] md:w-[40%] lg:w-[35%] aspect-video overflow-hidden rounded-2xl shadow-md"
//         whileHover={{ scale: 1.02 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//       >
//         <motion.img
//           src={post.img || "https://via.placeholder.com/800x450.png?text=No+Image"}
//           alt={title}
//           className="object-cover w-full h-full"
//           initial={{ scale: 1.05 }}
//           animate={{ scale: 1 }}
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         />

//         {/* Category overlay on hover */}
//         <motion.div
//           className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-md rounded-md text-[11px] text-blue-700 font-semibold transition-all"
//           initial={{ opacity: 0, y: 10 }}
//           whileHover={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.3,
//             delay: index * 0.1 + 0.2,
//           }}
//         >
//           <Link
//             to={`/posts?cat=${category}`}
//             className="hover:text-blue-900 transition duration-200"
//           >
//             {category}
//           </Link>
//         </motion.div>
//       </motion.div>

//       {/* Content Section */}
//       <motion.div
//         className="flex flex-col justify-between w-[55%] md:w-[60%] lg:w-[65%]"
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{
//           duration: 0.6,
//           delay: index * 0.1 + 0.2,
//           ease: "easeOut",
//         }}
//       >
//         {/* Title */}
//         <motion.div
//           whileHover={{ x: 4 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//         >
//           <Link
//             to={`/${post.slug}`}
//             className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-700 transition-colors duration-300 block"
//           >
//             <motion.span
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.5,
//                 delay: index * 0.1 + 0.4,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 textShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               {title}
//             </motion.span>
//           </Link>
//         </motion.div>

//         {/* Description */}
//         <motion.p
//           className="text-[14px] text-gray-600 mt-3 leading-snug"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.5,
//             delay: index * 0.1 + 0.5,
//             ease: "easeOut",
//           }}
//           whileHover={{
//             color: "#374151",
//             transition: { duration: 0.2 },
//           }}
//         >
//           {desc}
//         </motion.p>

//         {/* Bottom Row with Date and Underline */}
//         <div className="flex justify-between items-center mt-4">
//           {/* Gradient Underline */}
//           <motion.div
//             className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-1/2"
//             initial={{ scaleX: 0, opacity: 0 }}
//             whileHover={{ scaleX: 1, opacity: 1 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             style={{ originX: 0 }}
//           />

//           {/* Date on the right */}
//           <motion.span
//             className="text-[11px] text-gray-400"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{
//               duration: 0.3,
//               delay: index * 0.1 + 0.6,
//             }}
//           >
//             {format(post.createdAt)}
//           </motion.span>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default PostListItem;







import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";

// Utility to truncate description
const truncateLetters = (text = "", numLetters = 25) => {
  if (text.length <= numLetters) return text;
  return text.slice(0, numLetters) + " ...";
};

const PostListItem = ({ post, index = 0 }) => {
  const category = post?.category || "General";
  const desc = truncateLetters(post?.desc || "Read More...");
  const title = truncateLetters(post?.title || "Untitled Post");

  const { getToken } = useAuth();
  const { user } = useUser();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);

  // Check if the current user has already liked the post
  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post.likes, user?.id]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user || !user.id) {
        console.log("User is not logged in");
        return;
      }

      const token = await getToken();

      if (!token) {
        console.log("No token found from Clerk");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/like/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data; // updated likes array
    },
    onSuccess: (updatedLikes) => {
      const userId = user?.id;
      const hasLiked = updatedLikes.includes(userId);
      setLiked(hasLiked);
      setLikes(updatedLikes.length);
    },
    onError: (error) => {
      console.error("Like error:", error.response?.data || error.message);
    },
  });

  const handleLike = () => {
    likeMutation.mutate();
  };

  return (
    <motion.div
      className="flex justify-between gap-6 mb-8 p-4 group cursor-pointer border border-gray-200 rounded-2xl shadow-sm hover:shadow-md bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Section */}
      <motion.div
        className="relative w-[45%] md:w-[40%] lg:w-[35%] aspect-video overflow-hidden rounded-2xl shadow-md"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.img
          src={post.img || "https://via.placeholder.com/800x450.png?text=No+Image"}
          alt={title}
          className="object-cover w-full h-full"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Category Tag */}
        <motion.div
          className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-md rounded-md text-[11px] text-blue-700 font-semibold transition-all"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1 + 0.2,
          }}
        >
          <Link
            to={`/posts?cat=${category}`}
            className="hover:text-blue-900 transition duration-200"
          >
            {category}
          </Link>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="flex flex-col justify-between w-[55%] md:w-[60%] lg:w-[65%]"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.2,
          ease: "easeOut",
        }}
      >
        {/* Title */}
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link
            to={`/${post.slug}`}
            className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-700 transition-colors duration-300 block"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.4,
                ease: "easeOut",
              }}
              whileHover={{
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {title}
            </motion.span>
          </Link>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-[14px] text-gray-600 mt-3 leading-snug"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1 + 0.5,
            ease: "easeOut",
          }}
          whileHover={{
            color: "#374151",
            transition: { duration: 0.2 },
          }}
        >
          {desc}
        </motion.p>

        {/* Like Button */}
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1 mt-3 w-fit text-sm text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          <Heart
            size={20}
            className={`transition-all duration-200 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
          {likes}
        </motion.button>

        {/* Bottom Row */}
        <div className="flex justify-between items-center mt-4">
          <motion.div
            className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-1/2"
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
          <motion.span
            className="text-[11px] text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + 0.6,
            }}
          >
            {format(post.createdAt)}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostListItem;
