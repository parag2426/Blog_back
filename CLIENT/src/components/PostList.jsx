import PostListItems from './PostListItems';
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from 'react-router-dom';


// ✅ 1. Fetch function for posts with pagination and search filters
const fetchPosts = async (pageParam, searchParams) => {
  // Convert URLSearchParams into plain object (e.g., { tag: 'tech', sort: 'latest' })
  const searchParamsObj = Object.fromEntries([...searchParams]);

  console.log("Search Params Object: ", searchParamsObj); // ✅ Debugging help

  try {
    // Axios GET with pagination and filter params
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: {
        page: pageParam, // from infinite query
        limit: 5,
        ...searchParamsObj, // additional filters like category, tag, etc.
      },
    });

    return res.data; // should contain { posts: [...], hasMore: true/false }
  } catch (err) {
    console.error("Error fetching posts: ", err); // ✅ Log server error
    throw new Error(err?.response?.data?.message || "Failed to fetch posts");
  }
};


const PostList = () => {
  const [searchParams] = useSearchParams(); // ✅ 2. Get query params from URL like ?tag=tech

  // ✅ 3. Infinite Query setup
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()], // ✅ re-fetch if search query changes
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams), // ✅ pass both page and filters
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasMore ? allPages.length + 1 : undefined, // backend should send hasMore flag
  });

  // ✅ 4. Handle loading or error state
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>An error has occurred: {error.message}</div>;

  // ✅ 5. Flatten paginated posts into single list
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div className="min-h-screen overflow-auto">
      {/* ✅ 6. Infinite Scroll component handles loading more posts */}
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
