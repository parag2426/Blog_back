import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const SavedPost = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/saved/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", res.data); // Add this line to see the shape
        setSavedPosts(
          Array.isArray(res.data) ? res.data : res.data.saved || []
        );
      } catch (err) {
        console.error("Error fetching saved posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">Loading saved posts...</div>
    );
  }
  console.log(savedPosts);
  if (savedPosts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        You haven’t saved any posts yet.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Saved Posts</h1>
      <ul className="space-y-4">
        {savedPosts.map((post) => (
          <li key={post._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">Category: {post.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedPost;
