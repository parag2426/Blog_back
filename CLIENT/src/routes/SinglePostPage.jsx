// import { Link, useParams } from "react-router-dom";
// import {  FiSearch } from "react-icons/fi";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";
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
//   const { slug } = useParams();

//   const { isPending, error, data } = useQuery({
//     queryKey: ["post", slug],
//     queryFn: () => fetchPost(slug),
//   });

//   if (isPending) return "Loading...";
//   if (error) return "Something went wrong: " + error.message;
//   if (!data) return "Post not found!";
//   console.log("Data is -->" , data) ;
//   console.log("data.username is" )


//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

//       {/* Main Heading */}
//       <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900">
//         {data.title}
//       </h1>

//       {/* Hero Image */}
//       {data.img && (
//         <div className="mb-10">
//           <img
//             src={data.img}
//             alt="Post Visual"
//             className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
//           />
//         </div>
//       )}

//       {/* Author / Meta Info */}
//       <div className="text-gray-500 text-sm flex flex-wrap items-center gap-2 mb-10">
//         <span>Written by</span>
//         <Link to="" className="text-blue-600 font-medium hover:underline">
//           {data.user?.username || "Unknown Author"}
 
//         </Link>
//         <span>•</span>
//         <Link
//           to={`/posts?cat=${data.category}`}
//           className="text-blue-600 hover:underline"
//         >
//           {data.category}
//         </Link>
//         <span>• {format(data.createdAt)}</span>
//       </div>

//       {/* Short Description or Opening Paragraph */}
//       {data.desc && (
//         <p className="text-lg text-gray-800 leading-relaxed mb-10">
//           {data.desc}
//         </p>
//       )}

//       {/* Rich HTML Content */}
//       {data.content && (
//         <div
//           className="prose prose-lg md:prose-xl max-w-none text-gray-900"
//           dangerouslySetInnerHTML={{ __html: data.content }}
//         />
//       )}
      
    

//       {/* ========= SIDEBAR ========= */}
//       <aside className="flex flex-col gap-8">

//         {/* Author Info */}
//         <div className="bg-white p-6 rounded-3xl shadow-md">
//           <h2 className="text-sm font-semibold text-gray-500 mb-3">Author</h2>
//           <div className="flex items-center gap-4">
//             <img
//               src="https://i.pravatar.cc/100"
//               alt="Author"
//               className="w-14 h-14 object-cover rounded-full"
//             />
//             <div>
//               <h3 className="font-bold text-blue-800">John Doe</h3>
//               <p className="text-sm text-gray-500 leading-snug">
//                 Web developer & designer exploring UI/UX and AI intersections.
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-4 mt-4 text-lg text-gray-600">
//             <FaFacebookF className="hover:text-blue-700 cursor-pointer" />
//             <FaInstagram className="hover:text-pink-600 cursor-pointer" />
//           </div>
//         </div>

//         <PostMenuAction post={data}/>
        

//         {/* Categories */}
//         <div className="bg-white p-6 rounded-3xl shadow-md">
//           <h2 className="text-sm font-semibold text-gray-500 mb-3">Categories</h2>
//           <ul className="space-y-2 text-blue-700 text-sm">
//             <li>
//               <Link to="/posts" className="hover:underline">All Posts</Link>
//             </li>
//             <li>
//               <Link to="/posts?cat=web-design" className="hover:underline">Web Design</Link>
//             </li>
//             <li>
//               <Link to="/posts?cat=development" className="hover:underline">Development</Link>
//             </li>
//             <li>
//               <Link to="/posts?cat=databases" className="hover:underline">Databases</Link>
//             </li>
//             <li>
//               <Link to="/posts?cat=fashin-design" className="hover:underline">fashin-Design</Link>
//             </li>
//           </ul>
//         </div>


//         {/* Search */}
//         <div className="bg-white p-4 rounded-full shadow-md flex items-center gap-2">
//           <FiSearch className="text-gray-400 text-xl" />
//           <input
//             type="text"
//             placeholder="Search a post..."
//             className="outline-none text-sm w-full text-gray-700 bg-transparent"
//           />
//         </div>
//       </aside>

//       {/* Comments Section */}
//       <Comments postId={data._id} />
//     </div>
//   );
// };
// export default SinglePostPage;


// import { Link, useParams } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";
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
//   const { slug } = useParams();
//   const { isPending, error, data } = useQuery({
//     queryKey: ["post", slug],
//     queryFn: () => fetchPost(slug),
//   });

//   if (isPending) return "Loading...";
//   if (error) return "Something went wrong: " + error.message;
//   if (!data) return "Post not found!";

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
//       {/* === MAIN CONTENT === */}
//       <div className="space-y-10">
//         {/* Post Title */}
//         <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
//           {data.title}
//         </h1>

//         {/* Cover Image */}
//         {data.img && (
//           <img
//             src={data.img}
//             alt="Post Visual"
//             className="w-full h-[400px] object-cover rounded-3xl shadow-md"
//           />
//         )}

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//           <span>Written by</span>
//           <Link to="" className="text-blue-600 hover:underline font-medium">
//             {data.username || "Unknown Author"}
//           </Link>
//           <span>•</span>
//           <Link
//             to={`/posts?cat=${data.category}`}
//             className="text-blue-600 hover:underline"
//           >
//             {data.category}
//           </Link>
//           <span>• {format(data.createdAt)}</span>
//         </div>

//         {/* Short Description */}
//         {data.desc && (
//           <p className="text-lg text-gray-700 leading-relaxed">
//             {data.desc}
//           </p>
//         )}

//         {/* Rich Content */}
//         {data.content && (
//           <div
//             className="prose prose-lg md:prose-xl max-w-none text-gray-900"
//             dangerouslySetInnerHTML={{ __html: data.content }}
//           />
//         )}

//         {/* Comments */}
//         <div className="pt-10 border-t mt-10">
//           <Comments postId={data._id} />
//         </div>
//       </div>

//       {/* === SIDEBAR === */}
//       <aside className="space-y-8">
//         {/* Author Card */}
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h2 className="text-sm font-semibold text-gray-500 mb-3">Author</h2>
//           <div className="flex items-center gap-4">
//             <img
//               src="https://i.pravatar.cc/100"
//               alt="Author"
//               className="w-14 h-14 rounded-full object-cover"
//             />
//             <div>
//               <h3 className="font-bold text-blue-800">John Doe</h3>
//               <p className="text-sm text-gray-500">
//                 Web developer & designer exploring UI/UX and AI intersections.
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-4 mt-4 text-lg text-gray-600">
//             <FaFacebookF className="hover:text-blue-700 cursor-pointer" />
//             <FaInstagram className="hover:text-pink-600 cursor-pointer" />
//           </div>
//         </div>

//         {/* Post Actions (Edit/Delete) */}
//         <PostMenuAction post={data} />

//         {/* Categories */}
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h2 className="text-sm font-semibold text-gray-500 mb-3">Categories</h2>
//           <ul className="space-y-2 text-blue-700 text-sm">
//             <li><Link to="/posts" className="hover:underline">All Posts</Link></li>
//             <li><Link to="/posts?cat=web-design" className="hover:underline">Web Design</Link></li>
//             <li><Link to="/posts?cat=development" className="hover:underline">Development</Link></li>
//             <li><Link to="/posts?cat=databases" className="hover:underline">Databases</Link></li>
//             <li><Link to="/posts?cat=fashin-design" className="hover:underline">Fashion Design</Link></li>
//           </ul>
//         </div>

//         {/* Search Box */}
//         <div className="bg-white p-4 rounded-full shadow-md flex items-center gap-2">
//           <FiSearch className="text-gray-400 text-xl" />
//           <input
//             type="text"
//             placeholder="Search a post..."
//             className="outline-none text-sm w-full text-gray-700 bg-transparent"
//           />

//         </div>
//       </aside>
//     </div>
//   );
// };

// export default SinglePostPage;



import { Link, useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
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

  if (isPending) return <p className="text-center py-20 text-lg">Loading post...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Error: {error.message}</p>;
  if (!data) return <p className="text-center py-20 text-gray-600">Post not found!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-[2fr_1fr] gap-12">

      {/* === MAIN CONTENT === */}
      <main className="space-y-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          {data.title}
        </h1>

        {/* Image */}
        {data.img && (
          <img
            src={data.img}
            alt="Post"
            className="w-full h-[400px] object-cover rounded-3xl shadow-md"
          />
        )}

        {/* Meta Info */}
        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
          <span>By</span>
          <Link to="#" className="text-blue-600 font-medium hover:underline">
            {data.user?.username || "Unknown Author"}
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

        {/* Short Description */}
        {data.desc && (
          <p className="text-lg text-gray-700 leading-relaxed">{data.desc}</p>
        )}

        {/* Content */}
        {data.content && (
          <div
            className="prose prose-lg md:prose-xl max-w-none text-gray-900"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}

        
      </main>

      {/* === SIDEBAR === */}
      <aside className="flex flex-col gap-8">

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
              <h3 className="font-bold text-blue-800">
                {data.user?.username || "John Doe"}
              </h3>
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

        {/* Search Bar */}
        <div className="bg-white px-4 py-3 rounded-full shadow-md flex items-center gap-2">
          <FiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search a post..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>
      </aside>
      {/* Comments */}
        <div className="pt-10 border-t mt-12">
          <Comments postId={data._id} />
        </div>
    </div>
  );
};

export default SinglePostPage;
