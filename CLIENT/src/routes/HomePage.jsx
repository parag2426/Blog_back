import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainCategories from '../components/MainCategories';
import PostList from '../components/PostList';
import FeaturedPosts from '../components/Featuredpost';

const HomePage = () => {
  return (
    <motion.div
  className="pt-6 sm:pt-10 px-3 sm:px-4 lg:px-6 flex flex-col gap-4 sm:gap-8 max-w-6xl mx-auto mt-2" // Reduced pt + gap
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* Button Row */}
  <motion.div 
    className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2" // Smaller gaps on mobile
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
    <Link 
      to="/posts" 
      className="px-2.5 py-1 text-xs sm:text-sm bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 text-white font-medium rounded-full shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      Explore
    </Link>
    <Link 
      to="/about" 
      className="px-2.5 py-1 text-xs sm:text-sm bg-white text-gray-800 font-medium rounded-full border border-gray-200 hover:border-violet-400 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
    >
      About
    </Link>
  </motion.div>

  {/* Hero Section */}
  <motion.div
    className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 sm:gap-8 text-center md:text-left"
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    <motion.div
      className="w-full md:w-1/2 max-w-xl"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <h1 className="text-xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent leading-tight tracking-tight mb-2 sm:mb-4">
        For the Words That Matter
      </h1>
      <p className="hidden sm:block text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium">
        If words have power, then imagine what a prayer could hold. <br />
        <span className="text-slate-500 italic">In silence, it speaks louder than a thousand voices.</span>
      </p>
    </motion.div>

    {/* Spinning Write Button */}
    <Link to="/write" className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 group">
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        className="text-[10px] sm:text-xs font-medium tracking-wide animate-spin"
        style={{ animationDuration: '10s' }}
      >
        <path
          id="circlePath"
          fill="none"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
        />
        <text className="fill-slate-600">
          <textPath href="#circlePath" startOffset="0%">
            •--- Write your story ---•
          </textPath>
          <textPath href="#circlePath" startOffset="50%">
            •--- Share your idea ---•
          </textPath>
        </text>
      </svg>
      <button className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-full flex items-center justify-center text-white text-base sm:text-lg group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
        ✍️
      </button>
    </Link>
  </motion.div>

  {/* Main Categories */}
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="mt-1 sm:mt-2 hidden sm:block"
  >
    <MainCategories />
  </motion.div>

  {/* Featured */}
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="mt-1"
  >
    <FeaturedPosts />
  </motion.div>

  {/* Recent Section Title */}
  <motion.div 
    className="text-center mt-3 sm:mt-4"
    initial={{ y: 15, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.7, duration: 0.6 }}
  >
    <h2 className="text-lg sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">
      Recent Stories
    </h2>
    <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
      Fresh content from our community of writers and storytellers
    </p>
    <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mt-2 sm:mt-3"></div>
  </motion.div>

  {/* Post List */}
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="pb-4 sm:pb-6"
  >
    <PostList />
  </motion.div>
</motion.div>

  )

};

export default HomePage;