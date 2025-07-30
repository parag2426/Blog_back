import { Link, useLocation } from 'react-router-dom';

const categories = [
  { name: 'All', query: '' },
  { name: 'web-design', query: 'Web-Designs' },
  { name: 'Design', query: 'design' },
  { name: 'AI & ML', query: 'ai' },
  { name: 'Lifestyle', query: 'lifestyle' },
  { name: 'Business', query: 'business' },
  { name: 'Health', query: 'health' },
  { name: 'Travel', query: 'travel' },
];

const MainCategories = () => {
  const { pathname, search } = useLocation();
  const currentCat = new URLSearchParams(search).get('cat') || '';

  return (
    <div className="bg-slate-50/80 backdrop-blur-sm rounded-xl shadow-sm px-3 py-2.5 border border-slate-200/50">
      <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
        {categories.map(({ name, query }) => {
          const isActive = currentCat === query || (query === '' && pathname === '/posts');
          return (
            <Link
              key={query || 'all'}
              to={query ? `/posts?cat=${query}` : '/posts'}
              className={`snap-start whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm scale-105'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 shadow-sm border border-slate-200/70'
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
