// import { useState } from "react";
// import PostList from "../components/PostList";
// import SideMenu from "../components/SideMenu";


// const PostListPage = () => {
//   const[open ,setOpen ] = useState(false);
//   return (
//     <div className="mb-8 text-2xl"> 
//       <h1 className="flex gap-8">posts</h1>
//       <button onClick={()=>setOpen((prev)=>!prev)} className="bg-blue-800 md:hidden text-small text-white px-4 py-2 rounded-2xl" >{open ? "Close" : "Filter or Search"}</button>
//       <div className="flex flex-col-reverse gap-8 md:flex-row">
//         <div className="">
//             <PostList/>
//         </div>
//         <div className={`${open ? "block" : "hidden" } md:block`}>
//           <SideMenu/>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default PostListPage




import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="bg-blue-800 text-white text-sm px-4 py-2 rounded-full md:hidden hover:bg-blue-900 transition duration-200"
        >
          {open ? "Close Filter" : "Filter / Search"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row gap-8">
        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          <PostList />
        </div>

        {/* Side Menu / Filters */}
        <aside className={`${open ? "block" : "hidden"} md:block w-full md:w-1/3`}>
          <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 sticky top-20">
            <SideMenu />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default PostListPage;
