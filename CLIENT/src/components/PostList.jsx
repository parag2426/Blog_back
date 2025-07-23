import PostListItems from './PostListItems'
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import { useInfiniteQuery } from "@tanstack/react-query";

import InfiniteScroll from "react-infinite-scroll-component"


const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts` , {
    params: {page: pageParam , limit:5 } , 
  });
  return res.data;
};

const PostList = () => {
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length +1 : undefined ,

  }) ; 

  console.log(data)



  if (status === "loading") return "Loading....";
  if (status === "error") return "An error has occurred: " + error.message;
  const allPosts = data?.pages?.flatMap((page)=> page.posts) ||[]; 
  console.log(data);

  return (
    <div className='min-h-screen overflow-auto'>

   
    <InfiniteScroll
  dataLength={allPosts.length} //This is important field to render the next data
  next={fetchNextPage}
  hasMore={!!hasNextPage}
  scrollableTarget="scrollableDiv" 
  loader={<h4>Loading more posts ...</h4>}
  endMessage={
    <p >
      <b>All Posts are loaded</b>
    </p>
  }
  // // below props only if you need pull down functionality
  // refreshFunction={this.refresh}
  // pullDownToRefresh
  // pullDownToRefreshThreshold={50}
  // pullDownToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  // }
  // releaseToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  // }
>
   {allPosts.map(post=>(

        <PostListItems key={post._id} post={post} />

      ))}
</InfiniteScroll>
 </div>
     
      
  );
};

export default PostList
