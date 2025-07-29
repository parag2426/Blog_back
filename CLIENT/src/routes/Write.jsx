import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import Upload from '../components/Upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Quill.register('modules/imageResize', ImageResize);

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
      setValue((prev) =>
        prev + `<p><img src="${img.url}" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.15);" /></p>`
      );
    }
  }, [img]);

  useEffect(() => {
    if (video?.url) {
      setValue((prev) =>
        prev + `<p><iframe class="ql-video" src="${video.url}" frameborder="0" allowfullscreen style="width: 100%; aspect-ratio: 16/9; border-radius: 12px;"></iframe></p>`
      );
    }
  }, [video]);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      displaySize: true,
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success('🎉 Post published!', { position: 'top-right', theme: 'colored' });
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error('❌ Failed to create post.', { position: 'top-right', theme: 'colored' });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover?.url || '',
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
    };

    if (!data.title || !data.desc || !data.content) {
      toast.warn('⚠️ Please fill in all fields.', { position: 'top-right', theme: 'colored' });
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 bg-gradient-to-b from-white to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 space-y-8 border border-blue-100"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center">
          📝 Create a New Blog
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm w-full">
          <Upload type="image" setProgress={setProgress} setData={setCover}>
            <button
              type="button"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
            >
              📷 Upload Cover Image
            </button>
          </Upload>

          {cover?.url ? (
            <img
              src={cover.url}
              alt="Cover"
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-blue-300 shadow"
            />
          ) : (
            <p className="text-blue-600 text-sm italic">No cover selected</p>
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="✍️ Title goes here..."
          className="w-full text-2xl sm:text-3xl font-semibold border-b border-blue-200 focus:outline-none focus:border-blue-500 pb-2 placeholder-gray-400"
          required
        />

        <div>
          <label className="block text-base font-semibold text-blue-800 mb-1">
            📚 Category
          </label>
          <select
            name="category"
            defaultValue="general"
            className="w-full border border-blue-200 rounded-md px-3 py-2 text-blue-900 text-sm sm:text-base"
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

        <textarea
          name="desc"
          placeholder="📝 Brief summary of your blog post..."
          className="w-full border border-blue-200 rounded-md px-3 py-2 text-blue-900 text-sm sm:text-base"
          rows={4}
          required
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">

        {/* Upload Image Button */}
        <Upload type="image" setProgress={setProgress} setData={setImg}>
          <button
            type="button"
            className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-all duration-200 shadow"
          >
            🖼 Insert Image
          </button>
        </Upload>

        {/* Upload Video Button */}
        <Upload type="video" setProgress={setProgress} setData={setVideo}>
          <button
            type="button"
            className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-all duration-200 shadow"
          >
            🎥 Embed Video
          </button>
        </Upload>

      </div>


        <div className="bg-white border border-blue-200 rounded-md shadow-sm overflow-hidden w-full px-3 py-2 sm:px-4 sm:py-3">
        <ReactQuill
          value={value}
          onChange={setValue}
          theme="snow"
          modules={modules}
          placeholder="Start writing your blog..."
          className="text-blue-900 min-h-[200px] sm:min-h-[250px]"
        />
      </div>


        <button
          type="submit"
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white w-full py-3 rounded-md font-bold hover:bg-blue-900 transition disabled:opacity-60"
        >
          🚀 Publish Blog
        </button>

        {progress > 0 && progress < 100 && (
          <p className="text-sm text-blue-500 mt-2 text-center">
            Uploading... {progress}%
          </p>
        )}
      </form>
    </div>
  );
};

export default Write;
