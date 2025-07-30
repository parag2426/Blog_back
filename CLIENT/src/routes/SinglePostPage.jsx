import { Link, useParams } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import Comments from "../components/Comments";
import { format } from "timeago.js";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import PostMenuAction from "../components/PostMenuAction";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const [showFullImage, setShowFullImage] = useState(false);
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <p className="text-center py-20 text-lg">Loading post...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Error: {error.message}</p>;
  if (!data) return <p className="text-center py-20 text-gray-600">Post not found!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12 justify-center items-start">

        {/* === MAIN CONTENT === */}
        <main className="w-full lg:w-2/3 mx-auto space-y-10">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 leading-tight tracking-tight">
            {data.title}
          </h1>

          {/* Image */}
          {data.img && (
            <>
              <img
                src={data.img}
                alt="Post"
                className="w-full h-[400px] object-cover rounded-3xl shadow-md cursor-pointer hover:brightness-90 transition"
                onClick={() => setShowFullImage(true)}
              />

              {/* Fullscreen Image Modal */}
              {showFullImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                  onClick={() => setShowFullImage(false)}
                >
                  <img
                    src={data.img}
                    alt="Full Post"
                    className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
                  />
                </div>
              )}
            </>
          )}

          {/* Meta Info */}
          <div className=" p-6 text-sm text-gray-500 flex flex-wrap justify-center gap-2 bg-blue-100 rounded-2xl">
            <span>By</span>
            <Link to="#" className="text-blue-600 font-medium hover:underline">Palak Jain</Link>
            <span>•</span>
            <Link
              to={`/posts?cat=${data.category}`}
              className="text-blue-600 hover:underline"
            >
              {data.category}
            </Link>
            <span>• {format(data.createdAt)}</span>
          </div>

          {/* Short Description */}
          {data.desc && (
            <p className=" p-6 text-lg text-gray-700 leading-relaxed text-center bg-blue-100 rounded-2xl">{data.desc}</p>
          )}

          {/* Content */}
          {data.content && (
            <div
              className="prose prose-lg md:prose-xl max-w-none text-gray-900 mx-auto"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
        </main>

        {/* === SIDEBAR === */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-8">

          {/* Author Info */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">Author</h2>
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="Author"
                className="w-14 h-14 object-cover rounded-full"
              />
              <div>
                <h3 className="font-bold text-blue-800">Palak Jain</h3>
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

          {/* Post Actions */}
          <PostMenuAction post={data} />

          {/* Categories */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">Categories</h2>
            <ul className="space-y-2 text-sm text-blue-700">
              <li><Link to="/posts" className="hover:underline">All Posts</Link></li>
              <li><Link to="/posts?cat=web-design" className="hover:underline">Web Design</Link></li>
              <li><Link to="/posts?cat=development" className="hover:underline">Development</Link></li>
              <li><Link to="/posts?cat=databases" className="hover:underline">Databases</Link></li>
              <li><Link to="/posts?cat=fashion-design" className="hover:underline">Fashion Design</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Comments */}
      <div className="pt-16 mt-20 border-t border-gray-200 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">💬 Comments</h3>
        <div className="space-y-6">
          <Comments postId={data._id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;

