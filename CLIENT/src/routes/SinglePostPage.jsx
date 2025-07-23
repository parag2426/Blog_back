import { Link, useParams } from "react-router-dom";
import { FiBookmark, FiTrash2, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Comments from "../components/Comments";
import { format } from "timeago.js";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong: " + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900">
        {data.title}
      </h1>

      {/* Hero Image */}
      {data.img && (
        <div className="mb-10">
          <img
            src={data.img}
            alt="Post Visual"
            className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
          />
        </div>
      )}

      {/* Author / Meta Info */}
      <div className="text-gray-500 text-sm flex flex-wrap items-center gap-2 mb-10">
        <span>Written by</span>
        <Link to="/author/john" className="text-blue-600 font-medium hover:underline">
          John
        </Link>
        <span>•</span>
        <Link
          to={`/posts?cat=${data.category}`}
          className="text-blue-600 hover:underline"
        >
          {data.category}
        </Link>
        <span>• {format(data.createdAt)}</span>
      </div>

      {/* Short Description or Opening Paragraph */}
      {data.desc && (
        <p className="text-lg text-gray-800 leading-relaxed mb-10">
          {data.desc}
        </p>
      )}

      {/* Rich HTML Content */}
      {data.content && (
        <div
          className="prose prose-lg md:prose-xl max-w-none text-gray-900"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    

      {/* ========= SIDEBAR ========= */}
      <aside className="flex flex-col gap-8">

        {/* Author Info */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Author</h2>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="Author"
              className="w-14 h-14 object-cover rounded-full"
            />
            <div>
              <h3 className="font-bold text-blue-800">John Doe</h3>
              <p className="text-sm text-gray-500 leading-snug">
                Web developer & designer exploring UI/UX and AI intersections.
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-lg text-gray-600">
            <FaFacebookF className="hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Actions</h2>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 hover:text-blue-600 text-sm text-gray-700">
              <FiBookmark /> Save this post
            </button>
            <button className="flex items-center gap-2 text-red-500 hover:underline text-sm">
              <FiTrash2 /> Delete this post
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Categories</h2>
          <ul className="space-y-2 text-blue-700 text-sm">
            {["All", "Web Design", "Development", "Databases", "Search Engines", "Marketing"].map((cat) => (
              <li key={cat}>
                <Link to={`/posts?cat=${encodeURIComponent(cat)}`} className="hover:underline">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-full shadow-md flex items-center gap-2">
          <FiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search a post..."
            className="outline-none text-sm w-full text-gray-700 bg-transparent"
          />
        </div>
      </aside>

      {/* Comments Section */}
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;

