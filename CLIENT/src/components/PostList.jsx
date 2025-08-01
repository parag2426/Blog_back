import PostListItems from "./PostListItems";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParamsObj) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: {
        page: pageParam,
        limit: 5,
        ...searchParamsObj,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching posts: ", err);
    throw new Error(err?.response?.data?.message || "Failed to fetch posts");
  }
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URLSearchParams → plain object
  const searchParamsObj = Object.fromEntries([...searchParams.entries()]);
  const sort = searchParamsObj.sort || "newest"; // default fallback

  // Infinite Query
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParamsObj),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasMore ? allPages.length + 1 : undefined,
  });

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  // Update only sort param without clearing others
  const handleSortChange = (newSort) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", newSort);
    setSearchParams(newParams); // ✅ preserves all other existing params
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="min-h-screen overflow-auto">
      <div className="flex justify-center mb-6">
  <div className="flex bg-white border border-gray-300 rounded-full shadow-md overflow-hidden">
    {[
      { type: "newest", label: " Newest" },
      { type: "popular", label: " Popular" },
    ].map(({ type, label }) => (
      <button
        key={type}
        onClick={() => handleSortChange(type)}
        className={`px-5 py-2 text-sm font-medium transition-all duration-200 
          ${
            sort === type
              ? "bg-gray-900 text-white shadow-inner"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        {label}
      </button>
    ))}
  </div>
</div>



      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts ...</h4>}
        endMessage={<p><b>All Posts are loaded</b></p>}
      >
        {allPosts.map((post) => (
          <PostListItems key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;
