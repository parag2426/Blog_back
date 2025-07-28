import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainCategories from '../components/MainCategories';
import PostList from '../components/PostList';
import FeaturedPosts from '../components/Featuredpost';

const HomePage = () => {
  return (
    <motion.div
      className="mt-4 flex flex-col gap-8 px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb
      <motion.div
        className="flex gap-2 text-gray-600"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Link to="/">Home</Link>
        <span>*</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </motion.div> */}

      
       <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Blogs and Articles
      </motion.h2>

      {/* Introduction Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Text Content */}
        <motion.div
          className="max-w-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-gray-800 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            For the Words That Matter
          </h1>
          <p className="mt-6 text-md md:text-xl text-gray-700">
            If words have power, then imagine what a prayer could hold. <br />
            In silence, it speaks louder than a thousand voices.
          </p>
        </motion.div>

        {/* Rotating Circular Button */}
        <Link to="/write" className=" relative w-[200px] h-[200px] block shrink-0">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animationButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                • Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea
              </textPath>
            </text>
          </svg>

          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl">
            ✍️
          </button>
        </Link>
      </motion.div>

      {/* Main Categories */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <MainCategories />
      </motion.div>

      {/* Featured Posts */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FeaturedPosts />
      </motion.div>

      {/* Post List */}
     
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

