// import { Link, useParams } from "react-router-dom";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import { useState } from "react";
// import Comments from "../components/Comments";
// import { format } from "timeago.js";
// import { useQuery } from '@tanstack/react-query';
// import axios from "axios";
// import PostMenuAction from "../components/PostMenuAction";

// const fetchPost = async (slug) => {
//   const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
//   return res.data;
// };

// const SinglePostPage = () => {
//   const [showFullImage, setShowFullImage] = useState(false);
//   const { slug } = useParams();
//   const { isPending, error, data } = useQuery({
//     queryKey: ["post", slug],
//     queryFn: () => fetchPost(slug),
//   });

//   if (isPending) return <p className="text-center py-16 text-lg text-slate-600 animate-pulse">Loading post...</p>;
//   if (error) return <p className="text-center py-16 text-red-600 font-medium">Error: {error.message}</p>;
//   if (!data) return <p className="text-center py-16 text-slate-600">Post not found!</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
//       <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center items-start">

//         {/* === MAIN CONTENT === */}
//         <main className="w-full lg:w-2/3 mx-auto space-y-6 sm:space-y-8">
//           {/* Title */}
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center text-slate-900 leading-tight tracking-tight">
//             {data.title}
//           </h1>

//           {/* Image */}
//           {data.img && (
//             <>
//               <div className="relative group">
//                 <img
//                   src={data.img}
//                   alt="Post"
//                   className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg cursor-pointer group-hover:shadow-xl transition-all duration-300 border border-slate-200"
//                   onClick={() => setShowFullImage(true)}
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-all duration-300 flex items-center justify-center">
//                   <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1 rounded-full text-sm font-medium">
//                     Click to expand
//                   </span>
//                 </div>
//               </div>

//               {/* Fullscreen Image Modal */}
//               {showFullImage && (
//                 <div
//                   className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//                   onClick={() => setShowFullImage(false)}
//                 >
//                   <img
//                     src={data.img}
//                     alt="Full Post"
//                     className="max-w-full max-h-full rounded-xl shadow-2xl"
//                   />
//                   <button 
//                     className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
//                     onClick={() => setShowFullImage(false)}
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Meta Info */}
//           <div className="p-4 sm:p-5 text-sm text-slate-600 flex flex-wrap justify-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//             <span>By</span>
//             <Link to="#" className="text-blue-700 font-semibold hover:text-blue-800 hover:underline transition-colors">Palak Jain</Link>
//             <span>•</span>
//             <Link
//               to={`/posts?cat=${data.category}`}
//               className="text-blue-700 font-medium hover:text-blue-800 hover:underline transition-colors"
//             >
//               {data.category}
//             </Link>
//             <span>• {format(data.createdAt)}</span>
//           </div>

//           {/* Short Description */}
//           {data.desc && (
//             <div className="p-4 sm:p-6 text-base sm:text-lg text-slate-700 leading-relaxed text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
//               <p className="italic font-medium">{data.desc}</p>
//             </div>
//           )}

//           {/* Content */}
//           {data.content && (
//             <div
//               className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-slate-800 mx-auto prose-headings:text-slate-900 prose-headings:font-bold prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
//               dangerouslySetInnerHTML={{ __html: data.content }}
//             />
//           )}
//         </main>

//         {/* === SIDEBAR === */}
//         <aside className="w-full lg:w-1/3 flex flex-col gap-6">

//           {/* Author Info */}
//           <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
//             <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Author</h2>
//             <div className="flex items-center gap-4">
//               <img
//                 src="https://i.pravatar.cc/100"
//                 alt="Author"
//                 className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full ring-2 ring-blue-100"
//               />
//               <div>
//                 <h3 className="font-bold text-slate-800 text-base">Palak Jain</h3>
//                 <p className="text-sm text-slate-600 leading-snug mt-1">
//                   Web developer & designer exploring UI/UX and AI intersections.
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3 mt-4 text-lg">
//               <FaFacebookF className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
//               <FaInstagram className="text-slate-400 hover:text-pink-500 cursor-pointer transition-colors duration-200" />
//             </div>
//           </div>

//           {/* Post Actions */}
//           <PostMenuAction post={data} />

//           {/* Categories */}
//           <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
//             <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Categories</h2>
//             <ul className="space-y-2.5 text-sm">
//               <li>
//                 <Link to="/posts" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
//                   All Posts
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/posts?cat=web-design" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
//                   Web Design
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/posts?cat=development" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
//                   Development
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/posts?cat=databases" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
//                   Databases
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/posts?cat=fashion-design" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
//                   Fashion Design
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </aside>
//       </div>

//       {/* Comments */}
//       <div className="pt-12 sm:pt-16 mt-16 sm:mt-20 border-t border-slate-200 max-w-4xl mx-auto">
//         <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8 text-center flex items-center justify-center gap-2">
//           <span className="text-2xl">💬</span>
//           Comments
//         </h3>
//         <div className="space-y-6">
//           <Comments postId={data._id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePostPage;






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
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <p className="text-center py-16 text-lg text-slate-600 animate-pulse">Loading post...</p>;
  if (error) return <p className="text-center py-16 text-red-600 font-medium">Error: {error.message}</p>;
  if (!data) return <p className="text-center py-16 text-slate-600">Post not found!</p>;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center items-start">

        {/* === MAIN CONTENT === */}
        <main className="w-full lg:w-2/3 mx-auto space-y-6 sm:space-y-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center text-slate-900 leading-tight tracking-tight">
            {data.title}
          </h1>

          {/* Image */}
          {data.img && (
            <>
              <div className="relative group">
                <img
                  src={data.img}
                  alt="Post"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg cursor-pointer group-hover:shadow-xl transition-all duration-300 border border-slate-200"
                />
              </div>
            </>
          )}

          {/* Meta Info */}
          <div className="p-4 sm:p-5 text-sm text-slate-600 flex flex-wrap justify-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <span>By</span>
            <Link to="#" className="text-blue-700 font-semibold hover:text-blue-800 hover:underline transition-colors">Palak Jain</Link>
            <span>•</span>
            <Link
              to={`/posts?cat=${data.category}`}
              className="text-blue-700 font-medium hover:text-blue-800 hover:underline transition-colors"
            >
              {data.category}
            </Link>
            <span>• {format(data.createdAt)}</span>
          </div>

          {/* Short Description */}
          {data.desc && (
            <div className="p-4 sm:p-6 text-base sm:text-lg text-slate-700 leading-relaxed text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
              <p className="italic font-medium">{data.desc}</p>
            </div>
          )}

          {/* Content */}
          {data.content && (
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-slate-800 mx-auto prose-headings:text-slate-900 prose-headings:font-bold prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
        </main>

        {/* === SIDEBAR === */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6">

          {/* Author Info */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Author</h2>
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="Author"
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full ring-2 ring-blue-100"
              />
              <div>
                <h3 className="font-bold text-slate-800 text-base">Palak Jain</h3>
                <p className="text-sm text-slate-600 leading-snug mt-1">
                  Web developer & designer exploring UI/UX and AI intersections.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 text-lg">
              <FaFacebookF className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
              <FaInstagram className="text-slate-400 hover:text-pink-500 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Post Actions */}
          <PostMenuAction post={data} />

          {/* Categories */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Categories</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/posts" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
                  All Posts
                </Link>
              </li>
              <li>
                <Link to="/posts?cat=web-design" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
                  Web Design
                </Link>
              </li>
              <li>
                <Link to="/posts?cat=development" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
                  Development
                </Link>
              </li>
              <li>
                <Link to="/posts?cat=databases" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
                  Databases
                </Link>
              </li>
              <li>
                <Link to="/posts?cat=fashion-design" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-all duration-200 block">
                  Fashion Design
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Comments */}
      <div className="pt-12 sm:pt-16 mt-16 sm:mt-20 border-t border-slate-200 max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8 text-center flex items-center justify-center gap-2">
          <span className="text-2xl">💬</span>
          Comments
        </h3>
        <div className="space-y-6">
          <Comments postId={data._id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
