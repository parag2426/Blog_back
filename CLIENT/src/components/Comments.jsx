import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import Comment from "./Comment";

const fetchComments = async (postId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (err) => {
      console.error("Error creating comment:", err.response?.data || err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      desc: formData.get("desc"),
    };
    mutation.mutate(data);
    e.target.reset(); // clear input
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:w-3/5 mx-auto mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow">
        <textarea
          name="desc"
          placeholder="Write a comment..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          rows={3}
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-2 rounded-md font-medium"
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      {/* Display Comments */}
      {isPending ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load comments.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Optimistic preview comment */}
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables?.desc || ""} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user?.imageUrl,
                  username: user?.username,
                },
              }}
            />
          )}

          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
