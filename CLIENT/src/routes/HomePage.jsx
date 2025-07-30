import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainCategories from '../components/MainCategories';
import PostList from '../components/PostList';
import FeaturedPosts from '../components/Featuredpost';

const HomePage = () => {
  return (
    <motion.div
      className="mt-4 flex flex-col gap-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* ========== INTRODUCTION SECTION ========== */}
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 text-center md:text-left"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* ==== TEXT CONTENT ==== */}
        <motion.div
          className="w-full md:w-1/2 max-w-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600 bg-clip-text text-transparent leading-snug md:leading-tight drop-shadow-md">
            For the Words That Matter
          </h1>

          <p className="hidden sm:block mt-4 text-sm sm:text-base md:text-lg text-gray-600">
            If words have power, then imagine what a prayer could hold. <br />
            In silence, it speaks louder than a thousand voices.
          </p>
        </motion.div>

        {/* ==== CIRCULAR WRITE BUTTON ==== */}
        <Link to="/write" className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] shrink-0">
          <svg
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            className="text-sm tracking-wide animate-spin animationButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                •--- Write your story ---•
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
               •--- Share your idea ---•
              </textPath>
            </text>
          </svg>

          <button className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl">
            ✍️
          </button>
        </Link>
      </motion.div>

      {/* ========== MAIN CATEGORIES ========== */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <MainCategories />
      </motion.div>

      {/* ========== FEATURED POSTS ========== */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FeaturedPosts />
      </motion.div>

      {/* ========== POST LIST ========== */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <PostList />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
