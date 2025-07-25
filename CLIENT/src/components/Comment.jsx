import { format } from "timeago.js";

const Comment = ({ comment }) => {
  const user = comment.user;

  if (!user) return null;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-6 shadow-sm">
      <div className="flex items-center gap-4 mb-2">
        {user.img && (
          <img
            src={user.img}
            className="w-10 h-10 rounded-full object-cover"
            alt={user.username}
          />
        )}
        <div>
          <p className="font-semibold text-gray-800">{user.username}</p>
          <p className="text-sm text-gray-500">{format(comment.createdAt)}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{comment.desc}</p>
    </div>
  );
};

export default Comment;

