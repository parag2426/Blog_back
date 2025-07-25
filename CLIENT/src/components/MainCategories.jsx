// import { Link } from 'react-router-dom';
// import Search from './Search';


// const MainCategories = () => {
//   return (
//     <div className="hidden md:flex items-center justify-between bg-white rounded-full px-6 py-4 shadow-md gap-6">
      
//       {/* Category Links */}
//       <div className="flex flex-wrap items-center gap-4">
//         <Link to="/posts" className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition">
//           All Posts
//         </Link>
//         <Link to="/posts?cat=Development" className="text-blue-800 px-4 py-2 rounded-full hover:bg-blue-100 transition">
//           Web Design
//         </Link>
//         <Link to="/posts?cat=web-design" className="text-blue-800 px-4 py-2 rounded-full hover:bg-blue-100 transition">
//           Development
//         </Link>
//         <Link to="/posts?cat=AI" className="text-blue-800 px-4 py-2 rounded-full hover:bg-blue-100 transition">
//           AI
//         </Link>
//         <Link to="/posts?cat=fashion-design" className="text-blue-800 px-4 py-2 rounded-full hover:bg-blue-100 transition">
//           Fashion Design
//         </Link>
//       </div>

//       {/* Divider */}
//       <span className="text-gray-300 text-xl">|</span>

//       {/* Search Input */}
//       <Search/>
//     </div>
//   );
// };

// export default MainCategories;

import { Link, useLocation } from 'react-router-dom';
import Search from './Search';

// Define your categories as an array
const categories = [
  { name: 'All Posts', query: '' },
  { name: 'Web Design', query: 'web-design' },
  { name: 'Development', query: 'development' },
  { name: 'AI', query: 'ai' },
  { name: 'Fashion Design', query: 'fashion-design' },
];

const MainCategories = () => {
  const location = useLocation();

  // Helper to get current category from URL
  const getCurrentCat = () => {
    const params = new URLSearchParams(location.search);
    return params.get('cat') || '';
  };

  const currentCat = getCurrentCat();

  return (
    <div className="hidden md:flex items-center justify-between bg-white rounded-full px-6 py-4 shadow-md gap-6">
      
      {/* Category Links */}
      <div className="flex flex-wrap items-center gap-4">
        {categories.map(({ name, query }) => {
          const isActive = currentCat === query || (query === '' && location.pathname === '/posts');
          return (
            <Link
              key={query || 'all'}
              to={query ? `/posts?cat=${query}` : '/posts'}
              className={`px-4 py-2 rounded-full transition ${
                isActive
                  ? 'bg-blue-800 text-white hover:bg-blue-900'
                  : 'text-blue-800 hover:bg-blue-100'
              }`}
            >
              {name}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <span className="text-gray-300 text-xl">|</span>

      {/* Search Input */}
      <Search />
    </div>
  );
};

export default MainCategories;

