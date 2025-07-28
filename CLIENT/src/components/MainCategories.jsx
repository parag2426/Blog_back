import { Link, useLocation } from 'react-router-dom';
import Search from './Search';

const categories = [
  { name: 'All Posts', query: '' },
  { name: 'Web Design', query: 'web-design' },
  { name: 'Development', query: 'development' },
  { name: 'AI', query: 'ai' },
  { name: 'Fashion Design', query: 'fashion-design' },
];

const MainCategories = () => {
  const { pathname, search } = useLocation();
  const currentCat = new URLSearchParams(search).get('cat') || '';

  return (
    <div className="bg-white rounded-2xl shadow-md px-4 py-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Scrollable Category Buttons */}
      <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
        {categories.map(({ name, query }) => {
          const isActive = currentCat === query || (query === '' && pathname === '/posts');
          return (
            <Link
              key={query || 'all'}
              to={query ? `/posts?cat=${query}` : '/posts'}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
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

      {/* Search Field */}
      <div className="w-full md:w-auto mt-2 md:mt-0">
        <Search />
      </div>
    </div>
  );
};

export default MainCategories;



