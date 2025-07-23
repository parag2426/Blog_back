import { Link } from 'react-router-dom';
import MainCategories from '../components/MainCategories';
import PostList from '../components/PostList';
import FeaturedPosts from '../components/Featuredpost';

const HomePage = () => {
  return (
    <div className="mt-4 flex flex-col gap-8 px-4">
      
      {/* Breadcrumb */}
      <div className="flex gap-2 text-gray-600">
        <Link to="/">Home</Link>
        <span>*</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>

      {/* Introduction Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Text Content */}
        <div className="max-w-xl">
          <h1 className="text-gray-800 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            For the Words That Matter
          </h1>
          <p className="mt-6 text-md md:text-xl text-gray-700">
            If words have power, then imagine what a prayer could hold. <br />
            In silence, it speaks louder than a thousand voices.
          </p>
        </div>

        {/* Rotating Circular Button */}
        <Link to="/write" className=" hidden md:block relative w-[200px] h-[200px] block shrink-0">
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
      </div>

      {/* Main categories  */}
      <MainCategories/>
      {/* Featured Posts */}
      <FeaturedPosts/>
      {/* Post List  */}
      <h1 className='my-8 text-2xl text-gray-600'>Recent Posts</h1>
      <PostList/>

    </div>
  );
};

export default HomePage;
