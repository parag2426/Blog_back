import { format } from "timeago.js"

const Comment = ({ comment }) => {
  const user = comment.user;
  console.log("comment user -->", user);

  // Optional: skip rendering this comment if user is null
  if (!user) return null;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {/* Only render image if it exists */}
        {user.img && (
          <img
            src={user.img}
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />
        )}
        <span className="font-medium">{user.username}</span>
        <span className="text-sm">{format(comment.createdAt)}</span>
      </div>
      <div className="">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;

