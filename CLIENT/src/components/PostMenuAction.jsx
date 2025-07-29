import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      
      toast.success(" Post saved successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light", // Or "colored" depending on your design
      toastClassName: "text-lg px-6 py-4 rounded-xl shadow-md font-semibold bg-white border border-gray-300",
      bodyClassName: "text-gray-800 text-base",
      icon: "💾", // optional, you already have emoji in text — remove if duplicated
    });


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
              d="M19 6L18.5 19.5C18.5 20.3 17.8 21 17 21H7C6.2 21 5.5 20.3 5.5 19.5L5 6"
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

      {(user && (isPostOwner || isAdmin)) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
              <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 0 1-1 .5H7a1 1 0 0 1-1-.5L4 9zm5 2v8h2v-8H9zm4 0v8h2v-8h-2z" />
          </svg>
          <span>Delete this Post</span>
          {deleteMutation.isPending && (
            <span className="text-xs">(deleting...)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenuAction;
