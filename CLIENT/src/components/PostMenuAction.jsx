// import { useUser, useAuth } from "@clerk/clerk-react";
// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import LikeButton from "./LikeButton";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaWhatsapp,
//   FaRegBookmark,
//   FaBookmark,
//   FaShareAlt,
//   FaTrashAlt,
//   FaStar,
//   FaRegCommentDots,
// } from "react-icons/fa";

// const PostMenuAction = ({ post }) => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [showShareModal, setShowShareModal] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const shareUrl = `${window.location.origin}/posts/${post.slug}`;

//   const currentUsername =
//     user?.username ||
//     user?.publicMetadata?.username ||
//     user?.primaryEmailAddress?.emailAddress;

//   const isAdmin = user?.publicMetadata?.role === "admin";
//   const isPostOwner = post?.user?.username === currentUsername;

//   const { data: savedPosts = [] } = useQuery({
//     queryKey: ["savedPosts"],
//     queryFn: async () => {
//       const token = await getToken();
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/users/saved`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return res.data;
//     },
//     enabled: !!user,
//   });

//   const isSaved = savedPosts.includes(post._id);

//   const redirectIfNotAuth = () => {
//     if (!user) {
//       navigate("/sign-up");
//       return true;
//     }
//     return false;
//   };

//   const deleteMutation = useMutation({
//     mutationFn: async () => {
//       const token = await getToken();
//       return axios.delete(
//         `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//     },
//     onSuccess: () => navigate("/"),
//   });

//   const saveMutation = useMutation({
//     mutationFn: async () => {
//       const token = await getToken();
//       return axios.patch(
//         `${import.meta.env.VITE_API_URL}/users/save`,
//         { postId: post._id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
//       toast.success(
//         <div>
//           Post saved!{" "}
//           <Link
//             to="/saved"
//             className="text-blue-600 underline font-semibold hover:text-blue-800"
//           >
//             View Saved
//           </Link>
//         </div>
//       );
//     },
//   });

//   const featureMutation = useMutation({
//     mutationFn: async () => {
//       const token = await getToken();
//       return axios.patch(
//         `${import.meta.env.VITE_API_URL}/posts/feature`,
//         { postId: post._id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//     },
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["post", post.slug] }),
//   });

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       toast.error("Failed to copy link.");
//     }
//   };

//   const handleCommentClick = () => {
//     if (redirectIfNotAuth()) return;
//     const el = document.getElementById("comments");
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   if (!isLoaded) return null;

//   return (
//     <div>
//       <h1 className="mt-8 mb-4 text-sm font-semibold text-gray-700">
//         Actions
//       </h1>

//       <div className="flex flex-wrap gap-5 text-sm items-center text-gray-600">
//         {/* Save */}
//         <button
//           onClick={() => {
//             if (!redirectIfNotAuth()) saveMutation.mutate();
//           }}
//           className="flex items-center gap-2 hover:text-blue-600 transition"
//           title="Save post"
//         >
//           {isSaved ? <FaBookmark /> : <FaRegBookmark />}
//           <span>{isSaved ? "Saved" : "Save"}</span>
//         </button>

//         {/* Like */}
//         <LikeButton
//           postId={post._id}
//           initialLiked={post.likes?.includes(user?.id)}
//           initialLikes={post.likes?.length || 0}
//           onUnauthenticated={() => navigate("/sign-up")}
//         />

//         {/* Comment */}
//         <button
//           onClick={handleCommentClick}
//           className="flex items-center gap-2 hover:text-blue-600 transition"
//           title="Comment"
//         >
//           <FaRegCommentDots />
//           <span>Comment</span>
//         </button>

//         {/* Share */}
//         <button
//           onClick={() => setShowShareModal(true)}
//           className="flex items-center gap-2 hover:text-blue-600 transition"
//           title="Share"
//         >
//           <FaShareAlt />
//           <span>Share</span>
//         </button>

//         {/* Feature */}
//         {isAdmin && (
//           <button
//             onClick={() => featureMutation.mutate()}
//             className="flex items-center gap-2 hover:text-yellow-500 transition"
//             title="Feature"
//           >
//             <FaStar />
//             <span>{post.isFeatured ? "Featured" : "Feature"}</span>
//           </button>
//         )}

//         {/* Delete */}
//         {user && (isPostOwner || isAdmin) && (
//           <button
//             onClick={() => deleteMutation.mutate()}
//             className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
//             title="Delete"
//           >
//             <FaTrashAlt />
//             <span>Delete</span>
//             {deleteMutation.isPending && (
//               <span className="text-xs">(deleting...)</span>
//             )}
//           </button>
//         )}
//       </div>

//       {/* Share Modal */}
//       {showShareModal && (
//         <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fadeIn relative">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Share this post
//             </h2>
//             <input
//               readOnly
//               value={shareUrl}
//               className="w-full border rounded px-3 py-2 text-sm bg-gray-100 mb-3"
//             />
//             <button
//               onClick={handleCopyLink}
//               className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               {copied ? "✅ Link Copied!" : "📋 Copy Link"}
//             </button>

//             <div className="flex justify-around items-center mt-4 text-xl">
//               <a
//                 href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
//                   shareUrl
//                 )}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-500 hover:text-blue-700"
//                 title="Share on Twitter"
//               >
//                 <FaTwitter />
//               </a>
//               <a
//                 href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-green-500 hover:text-green-600"
//                 title="Share on WhatsApp"
//               >
//                 <FaWhatsapp />
//               </a>
//               <a
//                 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                   shareUrl
//                 )}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-700 hover:text-blue-900"
//                 title="Share on Facebook"
//               >
//                 <FaFacebookF />
//               </a>
//             </div>

//             <button
//               onClick={() => setShowShareModal(false)}
//               className="mt-5 w-full py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostMenuAction;


import { useUser, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LikeButton from "./LikeButton";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaRegBookmark,
  FaBookmark,
  FaShareAlt,
  FaTrashAlt,
  FaStar,
  FaRegCommentDots,
} from "react-icons/fa";

const PostMenuAction = ({ post }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/posts/${post.slug}`;

  const currentUsername =
    user?.username ||
    user?.publicMetadata?.username ||
    user?.primaryEmailAddress?.emailAddress;

  const isAdmin = user?.publicMetadata?.role === "admin";
  const isPostOwner = post?.user?.username === currentUsername;

  const { data: savedPosts = [] } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/saved`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    enabled: !!user,
  });

  const isSaved = savedPosts.includes(post._id);

  const redirectIfNotAuth = () => {
    if (!user) {
      navigate("/sign-up");
      return true;
    }
    return false;
  };

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      navigate("/");
    },
    onError: () => toast.error("Failed to delete post"),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });

      // ✅ Only show toast when newly saved
      if (!isSaved) {
        toast.success(
          <div>
            Post saved!{" "}
            <Link
              to="/saved"
              className="text-blue-600 underline hover:text-blue-800"
            >
              View Saved
            </Link>
          </div>
        );
      }
    },
    onError: () => toast.error("Failed to save post"),
  });

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] }),
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handleCommentClick = () => {
    if (redirectIfNotAuth()) return;
    const el = document.getElementById("comments");
    if (el) {
      // 👇 Forces scroll to re-trigger even if in view
      el.scrollIntoView({ behavior: "auto", block: "center" });
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  if (!isLoaded) return null;

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-semibold text-gray-700">
        Actions
      </h1>

      <div className="flex flex-wrap gap-5 text-sm items-center text-gray-600">
        {/* Save */}
        <button
          onClick={() => {
            if (!redirectIfNotAuth() && !saveMutation.isPending) {
              saveMutation.mutate();
            }
          }}
          className="flex items-center gap-2 hover:text-blue-600 transition"
          title="Save post"
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          <span>{isSaved ? "Saved" : "Save"}</span>
        </button>

        {/* Like */}
        <LikeButton
          postId={post._id}
          initialLiked={post.likes?.includes(user?.id)}
          initialLikes={post.likes?.length || 0}
          onUnauthenticated={() => navigate("/sign-up")}
        />

        {/* Comment */}
        <button
          onClick={handleCommentClick}
          className="flex items-center gap-2 hover:text-blue-600 transition"
          title="Comment"
        >
          <FaRegCommentDots />
          <span>Comment</span>
        </button>

        {/* Share */}
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 hover:text-blue-600 transition"
          title="Share"
        >
          <FaShareAlt />
          <span>Share</span>
        </button>

        {/* Feature (admin only) */}
        {isAdmin && (
          <button
            onClick={() => featureMutation.mutate()}
            className="flex items-center gap-2 hover:text-yellow-500 transition"
            title="Feature post"
          >
            <FaStar />
            <span>{post.isFeatured ? "Featured" : "Feature"}</span>
          </button>
        )}

        {/* Delete */}
        {(isPostOwner || isAdmin) && (
          <button
            onClick={() => deleteMutation.mutate()}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
            title="Delete post"
          >
            <FaTrashAlt />
            <span>Delete</span>
            {deleteMutation.isPending && (
              <span className="text-xs">(deleting...)</span>
            )}
          </button>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fadeIn relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Share this post
            </h2>
            <input
              readOnly
              value={shareUrl}
              className="w-full border rounded px-3 py-2 text-sm bg-gray-100 mb-3"
            />
            <button
              onClick={handleCopyLink}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {copied ? "✅ Link Copied!" : "📋 Copy Link"}
            </button>

            <div className="flex justify-around items-center mt-4 text-xl">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-700"
                title="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-green-600"
                title="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:text-blue-900"
                title="Share on Facebook"
              >
                <FaFacebookF />
              </a>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-5 w-full py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMenuAction;
