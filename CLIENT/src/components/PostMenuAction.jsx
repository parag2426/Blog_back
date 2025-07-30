import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify"; // ✅ Added toast import

const PostMenuAction = ({ post }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log("Error to delete post", error);
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
      if (!isSaved) {
  toast.success(
    <div className="text-gray-800 text-base">
      Post saved successfully!{" "}
      <Link
        to="/saved"
        className="text-blue-600 underline font-semibold hover:text-blue-800"
      >
        View Saved Posts
      </Link>
    </div>,
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      toastClassName:
        "text-lg px-6 py-4 rounded-xl shadow-md font-semibold bg-white border border-gray-300",
      icon: "💾",
    }
  );
}



    },
    onError: (error) => {
      console.log("Error saving post", error);
    },
  });

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      console.log("Error featuring post", error);
    },
  });

  const handleDelete = () => deleteMutation.mutate();
  const handleFeature = () => featureMutation.mutate();
  const handleSave = () => {
    if (!user) return navigate("/login");
    saveMutation.mutate();
  };

  useEffect(() => {
    console.log("🟢 Clerk user:", user);
    console.log("🟢 isLoaded:", isLoaded);
    console.log("🟢 Post received:", post);
  }, [user, isLoaded, post]);

  if (!isLoaded) return null;

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  const currentUsername =
    user?.username || user?.publicMetadata?.username || user?.primaryEmailAddress?.emailAddress;

  const isPostOwner = post?.user?.username === currentUsername;

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      {isPending ? (
        "Loading..."
      ) : error ? (
        "Failed to load saved posts!"
      ) : (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
              fill={
                saveMutation.isPending
                  ? isSaved
                    ? "none"
                    : "black"
                  : isSaved
                  ? "black"
                  : "none"
              }
            />
          </svg>
          <span>Save this Post</span>
        </div>
      )}

      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={
                featureMutation.isPending
                  ? post.isFeatured
                    ? "none"
                    : "black"
                  : post.isFeatured
                  ? "black"
                  : "none"
              }
            />
          </svg>
          
        </div>
      )}

      {user && (isPostOwner || isAdmin) && (
  <div
    className="flex items-center gap-2 py-2 text-sm cursor-pointer hover:text-red-600 transition"
    onClick={handleDelete}
  >
    {/* Trash Icon SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>

    {/* Text */}
    <span>Delete this Post</span>

    {/* Optional Loading Text */}
    {deleteMutation.isPending && (
      <span className="text-xs text-red-400">(deleting...)</span>
    )}
  </div>
)}
    </div>
  );
};
export default PostMenuAction;
