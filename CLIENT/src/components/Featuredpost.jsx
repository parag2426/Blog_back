import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedPosts = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 bg-[#fefcf8]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-7xl mx-auto">

        {/* === Left Text Section === */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6 tracking-tight">
            Where Stories <br /> Find Their Voice
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 text-base leading-relaxed">
            Discover inspiring stories, writing tips, and real experiences from writers and creatives around the world.
          </p>
          <Link
            to="/posts"
            className="inline-block mt-2 px-6 py-3 text-sm font-semibold border border-gray-800 text-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition"
          >
            Explore Featured Posts
          </Link>
        </motion.div>

        {/* === Right Image Card === */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7 }} 
          className="w-full lg:w-1/2 bg-white shadow-xl rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1170&q=80"
            alt="Writing Desk"
            className="w-full h-80 object-cover rounded-t-3xl"
          />
          <div className="p-6 text-center">
            <p className="text-xs text-gray-500 uppercase mb-1 tracking-widest">Editor’s Pick</p>
            <h3 className="text-2xl font-semibold text-gray-900">The Art of Writing in the Digital Age</h3>
            <p className="text-sm text-gray-500 mt-1">Creative • Minimalism • Focus</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPosts;


