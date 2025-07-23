import { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom' ;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import Upload from '../components/Upload';




const Write = () => {
  const [value, setValue] = useState('');


  const [cover, setCover] = useState('');
  const [progress, setProgress] = useState('');
  const [img,setImg] = useState(""); 
  const [video ,setVideo] = useState("") ; 
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(()=>{
    img && setValue(prev => prev+ `<p><image src="${img.url}"</p>`)
  } , [img])
  useEffect(()=>{
    video && setValue(prev => prev+ `<p><iframe class = "ql-video" src="${video.url}"</p>`)
  } , [video])

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();

      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      navigate(`/${res.data.slug}`)
    },
    onError: (err) => {
      console.error("Error creating post:", err);
      alert("❌ Failed to create post. Please try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover.url ||"" , 
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    // Basic check to avoid empty submissions
    if (!data.title || !data.desc || !data.content) {
      alert("Please fill in all required fields.");
      return;
    }
    mutation.mutate(data);

  };


  return (
   
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 md:p-12">
      
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-8"
      >
        {/* Title */}
        <h1 className="text-4xl font-semibold text-gray-700">📝 Create a New Post</h1>

        {/* Cover Image Button */}

        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            📸 Add Cover
          </button>
        </Upload>

        {/* Post Title */}
        <input
          type="text"
          name="title"
          placeholder="Enter a compelling title..."
          className="text-3xl font-bold placeholder:italic text-gray-800 bg-transparent outline-none border-b border-gray-300 focus:border-blue-500 transition duration-200 py-2"
          required
        />

        {/* Category Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Choose a category:</label>
          <select
            name="category"
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          placeholder="Write a short description of your post..."
          className="resize-none border border-gray-300 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          required
        ></textarea>

        {/* Rich Text Editor */}
        <div className='flex'>
          <div className='flex flex-col gap-2 mr-2'>
             <Upload type="image" setProgress={setProgress} setData={setImg}>
              📸
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              🌇
            </Upload>

            
          </div>
          
        <div className="border rounded-lg overflow-hidden">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-64"
          />
        </div>
        </div>

        {/* Submit Button */}
        <button
        disabled ={mutation.isPending || (0 < progress && progress < 100) }
          className="self-start bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-200"
          type="submit"
        >
          🚀 Publish Post
        </button>
        {"Progress:" + progress}
      </form>
    </div>
  );
};

export default Write;
