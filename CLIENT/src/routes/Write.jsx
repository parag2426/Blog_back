// import { useEffect, useState  } from 'react';
// import { useNavigate } from 'react-router-dom' ;
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useMutation } from "@tanstack/react-query";
// import axios from 'axios';
// import { useAuth } from "@clerk/clerk-react";
// import Upload from '../components/Upload';

// const Write = () => {
//   const [value, setValue] = useState('');


//   const [cover, setCover] = useState('');
//   const [progress, setProgress] = useState('');
//   const [img,setImg] = useState(""); 
//   const [video ,setVideo] = useState("") ; 
//   const navigate = useNavigate();
//   const { getToken } = useAuth();

//   useEffect(()=>{
//     img && setValue(prev => prev+ `<p><image src="${img.url}"</p>`)
//   } , [img])
//   useEffect(()=>{
//     video && setValue(prev => prev+ `<p><iframe class = "ql-video" src="${video.url}"</p>`)
//   } , [video])

//   const mutation = useMutation({
//     mutationFn: async (newPost) => {
//       const token = await getToken();

//       return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     },
//     onSuccess: (res) => {
//       navigate(`/${res.data.slug}`)
//     },
//     onError: (err) => {
//       console.error("Error creating post:", err);
//       alert("❌ Failed to create post. Please try again.");
//     },
//   });
//   console.log ("Auth Token" , token )


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const data = {
//       img: cover.url ||"" , 
//       title: formData.get("title"),
//       category: formData.get("category"),
//       desc: formData.get("desc"),
//       content: value,
//     };

//     // Basic check to avoid empty submissions
//     if (!data.title || !data.desc || !data.content) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     mutation.mutate(data);

//   };


//   return (
   
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 md:p-12">
      
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-8"
//       >
//         {/* Title */}
//         <h1 className="text-4xl font-semibold text-gray-700">📝 Create a New Post</h1>

//         {/* Cover Image Button */}

//         <Upload type="image" setProgress={setProgress} setData={setCover}>
//           <button
//             type="button"
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
//           >
//             📸 Add Cover
//           </button>
//         </Upload>

//         {/* Post Title */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Enter a compelling title..."
//           className="text-3xl font-bold placeholder:italic text-gray-800 bg-transparent outline-none border-b border-gray-300 focus:border-blue-500 transition duration-200 py-2"
//           required
//         />

//         {/* Category Dropdown */}
//         <div className="flex flex-col gap-2">
//           <label className="text-gray-600 font-medium">Choose a category:</label>
//           <select
//             name="category"
//             className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             defaultValue="general"
//             required
//           >
//             <option value="general">General</option>
//             <option value="web-design">Web Design</option>
//             <option value="development">Development</option>
//             <option value="databases">Databases</option>
//             <option value="seo">Search Engines</option>
//             <option value="marketing">Marketing</option>
//           </select>
//         </div>

//         {/* Description */}
//         <textarea
//           name="desc"
//           placeholder="Write a short description of your post..."
//           className="resize-none border border-gray-300 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           rows={3}
//           required
//         ></textarea>

//         {/* Rich Text Editor */}
//         <div className='flex'>
//           <div className='flex flex-col gap-2 mr-2'>
//              <Upload type="image" setProgress={setProgress} setData={setImg}>
//               📸
//             </Upload>
//             <Upload type="video" setProgress={setProgress} setData={setVideo}>
//               🌇
//             </Upload>

            
//           </div>
          
//         <div className="border rounded-lg overflow-hidden">
//           <ReactQuill
//             theme="snow"
//             value={value}
//             onChange={setValue}
//             className="h-64"
//           />
//         </div>
//         </div>

//         {/* Submit Button */}
//         <button
//         disabled ={mutation.isPending || (0 < progress && progress < 100) }
//           className="self-start bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-200"
//           type="submit"
//         >
//           🚀 Publish Post
//         </button>
//         {"Progress:" + progress}
//       </form>
//     </div>
//   );
// };

// export default Write;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import Upload from '../components/Upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {
  const [value, setValue] = useState('');
  const [cover, setCover] = useState('');
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    if (img?.url) {
      setValue(prev => prev + `<p><img src="${img.url}" /></p>`);
    }
  }, [img]);

  useEffect(() => {
    if (video?.url) {
      setValue(prev => prev + `<p><iframe class="ql-video" src="${video.url}" frameborder="0" allowfullscreen></iframe></p>`);
    }
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("🎉 Post published successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error("❌ Failed to create post. Please try again.", {
        position: "top-right",
        theme: "colored",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      img: cover?.url || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    if (!data.title || !data.desc || !data.content) {
      toast.warn("⚠️ Please fill in all required fields.", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafe] to-[#eef1f9] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-10 space-y-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">📝 New Post</h1>

        {/* Cover Upload */}
    <div className="flex items-center gap-6 p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm w-full max-w-xl">
      {/* Upload Button */}
      <Upload type="image" setProgress={setProgress} setData={setCover}>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          📷 Upload Cover
        </button>
      </Upload>

      {/* Preview */}
      {cover?.url ? (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md border border-gray-200">
          <img
            src={cover.url}
            alt="Cover Preview"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="text-gray-500 italic">No cover selected</div>
      )}
    </div>


        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Awesome title goes here..."
          className="w-full text-3xl font-semibold text-gray-900 placeholder-gray-400 border-b border-gray-300 focus:border-blue-600 outline-none py-2"
          required
        />

        {/* Category Dropdown */}
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="general"
            required
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          name="desc"
          placeholder="Short summary of your post..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
          required
        />

        {/* Editor & Uploads */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-3 w-full lg:w-1/4">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button
                type="button"
                className="w-full py-2 px-4 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium"
              >
                🖼 Insert Image
              </button>
            </Upload>

            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button
                type="button"
                className="w-full py-2 px-4 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-medium"
              >
                🎥 Insert Video
              </button>
            </Upload>
          </div>

          <div className="w-full lg:w-3/4 border rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="h-72"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold transition duration-200 disabled:opacity-50"
        >
          🚀 Publish Post
        </button>

        {/* Upload Progress */}
        {progress > 0 && progress < 100 && (
          <p className="text-sm text-gray-500 mt-2">Uploading... {progress}%</p>
        )}
      </form>
    </div>
  );
};

export default Write;
