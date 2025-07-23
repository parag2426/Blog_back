import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";


const PostListPage = () => {
  const[open ,setOpen ] = useState(false);
  return (
    <div className="mb-8 text-2xl"> 
      <h1 className="flex gap-8">Development Post</h1>
      <button onClick={()=>setOpen((prev)=>!prev)} className="bg-blue-800 md:hidden text-small text-white px-4 py-2 rounded-2xl" >{open ? "Close" : "Filter or Search"}</button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="">
            <PostList/>
        </div>
        <div className={`${open ? "block" : "hidden" } md:block`}>
          <SideMenu/>
        </div>
      </div>
      
    </div>
  )
}

export default PostListPage
