// import { useState } from "react";
// import PostList from "../components/PostList";
// import SideMenu from "../components/SideMenu";

// const PostListPage = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-6">
//       {/* Page Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>

//         {/* Mobile Toggle Button */}
//         <button
//           onClick={() => setOpen(prev => !prev)}
//           className="bg-blue-800 text-white text-sm px-4 py-2 rounded-full md:hidden hover:bg-blue-900 transition duration-200"
//         >
//           {open ? "Close Filter" : "Filter / Search"}
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col-reverse md:flex-row gap-8">
//         {/* Posts Section */}
//         <div className="w-full md:w-2/3">
//           <PostList />
//         </div>

//         {/* Side Menu / Filters */}
//         <aside className={`${open ? "block" : "hidden"} md:block w-full md:w-1/3`}>
//           <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 sticky top-20">
//             <SideMenu />
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// };

// export default PostListPage;


import { useState } from "react";
import { motion } from "framer-motion";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Explore All Posts
        </h3>

        {/* Mobile Filter Button */}
        <motion.button
          onClick={() => setOpen(prev => !prev)}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-5 py-2 text-sm font-semibold rounded-full md:hidden shadow-md hover:opacity-90 transition-all"
        >
          {open ? "✖ Close Filter" : "Filter / Search"}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row gap-8">
        {/* Post List Section */}
        <motion.div
          className="w-full md:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PostList />
        </motion.div>

        {/* Sidebar (Filters) */}
        <motion.aside
          className={`${open ? "block" : "hidden"} md:block w-full md:w-1/3`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Filter Options</h2>
            <SideMenu />
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default PostListPage;
