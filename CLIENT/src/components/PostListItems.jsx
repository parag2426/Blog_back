
import { Link} from 'react-router-dom';
import {format} from "timeago.js";  

const PostListItems = ({post}) => {
  


  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4 bg-white rounded-2xl shadow-sm mb-12">

      {/* Image */}
      {post.img && <div className=" w-full xl:w-1/3">
        <img
          src={post.img}
          alt="Post"
          className="rounded-2xl object-cover w-full h-full max-h-[200px]"
        />
      </div>}

      {/* Details */}
      <div className="flex flex-col gap-4 w-full xl:w-2/3">

        {/* Title */}
        <Link
          to={`/${post.slug}`}
          className="text-2xl sm:text-3xl font-semibold text-gray-900 hover:text-blue-800 transition duration-200"
        >
          {post.title}
        </Link>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
          <span>Written by</span>
         <Link className="text-blue-500 hover:underline" to="#">John</Link>     {/*  {post.user.username} */}

          <span>on</span>
          <Link className="text-blue-500 hover:underline" to="/test">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div> 

        {/* Summary */}
        <p className="text-gray-700 leading-relaxed">
          {post.desc}
        </p>

        {/* Read More */}
        <Link
          to={`/${post.slug}`}
          className="text-blue-800 text-sm font-medium underline hover:text-blue-600 transition"
        >
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
