import { Link, useLocation } from 'react-router-dom';

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
    <div className="bg-white rounded-2xl shadow-md px-4 py-3 md:px-8 md:py-4">
      <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
        {categories.map(({ name, query }) => {
          const isActive = currentCat === query || (query === '' && pathname === '/posts');
          return (
            <Link
              key={query || 'all'}
              to={query ? `/posts?cat=${query}` : '/posts'}
              className={`snap-start whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border transition duration-200 ${
                isActive
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
              }`}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainCategories;




