// components/LikeButton.jsx
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const LikeButton = ({ postId, initialLiked, initialLikes }) => {

  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const [liked, setLiked] = useState(initialLiked || false);
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
    setLikes(initialLikes);
  }, [initialLiked, initialLikes]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!isSignedIn || !user?.id) throw new Error("Please sign in");

      const token = await getToken();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onMutate: async () => {
      setIsProcessing(true);
      const prevLiked = liked;
      const prevLikes = likes;

      setLiked(!prevLiked);
      setLikes(prevLiked ? likes - 1 : likes + 1);

      return { prevLiked, prevLikes };
    },
    onSuccess: (data) => {
      if (Array.isArray(data.likes)) {
        const userId = user?.id;
        setLiked(data.likes.includes(userId));
        setLikes(data.likes.length);
      } else if (typeof data.likesCount === "number") {
        setLiked(data.userLiked);
        setLikes(data.likesCount);
      }
      setIsProcessing(false);
    },
    onError: (error, _, context) => {
      if (context) {
        setLiked(context.prevLiked);
        setLikes(context.prevLikes);
      }
      setIsProcessing(false);
      alert(error?.message || "Failed to update like");
    },
  });

  const handleLike = () => {
    if (isProcessing || likeMutation.isLoading) return;
    if (!isSignedIn) return alert("Please sign in to like posts");
    likeMutation.mutate();
  };

  return (
    <button
      onClick={handleLike}
      disabled={isProcessing || likeMutation.isLoading}
      className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
        isProcessing || likeMutation.isLoading
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:text-red-500"
      } ${liked ? "text-red-500" : "text-gray-600"}`}
    >
      <Heart
        size={20}
        className={`transition-all duration-200 ${
          liked ? "fill-red-500 text-red-500" : "text-gray-400"
        } ${isProcessing ? "animate-pulse" : ""}`}
      />
      <span className="select-none">{likes}</span>
    </button>
  );
};

export default LikeButton;
