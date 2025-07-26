import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    toast.success("Redirecting you to the Home Page!", {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            Your Voice Deserves to Be Heard
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Welcome to the ultimate blogging platform designed for storytellers,
            thinkers, and creators like you.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="px-6 md:px-24 py-16 text-center bg-white">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Why Choose Our Platform?
        </h2>
        <p className="text-gray-600 text-md md:text-lg mb-12 max-w-3xl mx-auto">
          Whether you’re an experienced writer or just getting started, our
          platform gives you the tools to share your voice with the world.
          Reach your audience, grow your brand, and connect with fellow
          creators—all in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
          <div className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">🌍 Global Reach</h3>
            <p className="text-gray-600">
              Instantly publish your thoughts and reach readers around the world.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">✍️ Powerful Editor</h3>
            <p className="text-gray-600">
              Write freely with our distraction-free, rich-text editor built
              for creators.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">📈 Creator Growth</h3>
            <p className="text-gray-600">
              Track your performance, grow your community, and get discovered
              faster.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 py-16 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Start Your Journey Today</h2>
        <p className="text-md md:text-lg mb-8 max-w-xl mx-auto">
          Thousands of writers have already joined our platform. Don’t miss out
          on your chance to make your voice heard.
        </p>

        <button
          onClick={handleStartClick}
          className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t pt-6 pb-4 bg-gray-100">
        © {new Date().getFullYear()} Blogging Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
