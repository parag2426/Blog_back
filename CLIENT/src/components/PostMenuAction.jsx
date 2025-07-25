import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PostMenuAction = ({ post }) => {
  const { user, isLoaded } = useUser(); // ✅ Use isLoaded
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

  if (!isLoaded) return null; // ✅ Wait for Clerk to load user info

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  // ✅ Use email address or custom field instead of username
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
          {/* Save Icon */}
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
          {saveMutation.isPending && <span className="text-xs">(saving...)</span>}
        </div>
      )}

      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          {/* Feature Icon */}
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
          <span>Feature</span>
          {featureMutation.isPending && <span className="text-xs">(featuring...)</span>}
        </div>
      )}

      {(user && (isPostOwner || isAdmin)) && (  //post.user.username
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleDelete}
        >
          {/* Delete Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="..." />
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
