import { Link } from 'react-router-dom';

const FeaturedPosts = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">

      {/* ===== Left Large Post ===== */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">

        {/* Image */}
        <img
          src="featured1.jpeg"
          alt="Featured"
          className="rounded-3xl object-cover w-full h-64"
        />

        {/* Meta */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="/posts?cat=web-design" className="text-blue-800 lg:text-lg">
            Web Design
          </Link>
          <span className="text-gray-500">2 days ago</span>
        </div>

        {/* Title */}
        <Link to="/test" className="text-xl lg:text-3xl font-semibold lg:font-bold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Link>
      </div>

      {/* ===== Right Small Posts ===== */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">

        {/* Second Post */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <img
            src="featured2.jpeg"
            alt="Featured 2"
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h2 className="font-semibold">02.</h2>
              <Link to="/posts?cat=web-design" className="text-blue-800">Web Design</Link>
              <span className="text-gray-500">2 days ago</span>
            </div>
            <Link to="/test" className="text-base sm:text-lg md:text-2xl">
              Lorem ipsum dolor sit amet.
            </Link>
          </div>
        </div>

        {/* Third Post */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <img
            src="featured3.jpeg"
            alt="Featured 3"
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h2 className="font-semibold">03.</h2>
              <Link to="/posts?cat=ai" className="text-blue-800">AI</Link>
              <span className="text-gray-500">3 days ago</span>
            </div>
            <Link to="/test" className="text-base sm:text-lg md:text-2xl">
              Exploring the future of intelligence.
            </Link>
          </div>
        </div>

        {/* Fourth Post */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <img
            src="featured4.jpeg"
            alt="Featured 4"
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h2 className="font-semibold">04.</h2>
              <Link to="/posts?cat=fashion-design" className="text-blue-800">Fashion</Link>
              <span className="text-gray-500">4 days ago</span>
            </div>
            <Link to="/test" className="text-base sm:text-lg md:text-2xl">
              Style meets storytelling in modern fashion.
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedPosts;

