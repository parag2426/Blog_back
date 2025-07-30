import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between mt-5">
      {/* === Hero Section === */}
      <div
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Your Voice Deserves to Be Heard
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md text-gray-200">
            Welcome to the ultimate blogging platform built for writers, dreamers, and digital creators.
          </p>
        </motion.div>
      </div>

      {/* === About Section === */}
      <section className="px-6 md:px-24 py-20 bg-white text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Platform?
        </motion.h2>
        <motion.p
          className="text-gray-600 text-md md:text-lg mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Whether you’re a seasoned writer or just getting started, we provide the tools to help you connect, create, and grow your presence online.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
          {[
            {
              icon: "🌍",
              title: "Global Reach",
              desc: "Share your stories with readers across the world in just one click.",
            },
            {
              icon: "✍️",
              title: "Powerful Editor",
              desc: "Craft beautiful content with our distraction-free rich text editor.",
            },
            {
              icon: "📈",
              title: "Creator Growth",
              desc: "Analyze, adapt, and accelerate your growth with performance tools.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-2">
                {item.icon} {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === New Chapter: The Story Behind the Platform === */}
      <motion.section
        className="bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-24 px-6 md:px-32 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6">
          The Story Behind the Platform
        </h2>
        <p className="text-gray-700 text-md md:text-lg max-w-3xl mx-auto mb-6">
          This platform began as a small side project—just a place to write and express. But as voices joined in, it became a living library of dreams, truths, and ideas. We realized it was never just about writing; it was about empowering creators to speak, be heard, and inspire.
        </p>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto italic">
          Everyone has a story. Some just need a space to tell it.
        </p>
      </motion.section>

      {/* === CTA Section === */}
      <motion.section 
        className="bg-indigo-600 py-20 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="text-md md:text-lg mb-8 max-w-xl mx-auto text-gray-200">
          Join thousands of creators already building communities and sharing stories. It’s your turn to shine.
        </p>

        <button
          onClick={handleStartClick}
          className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </button>
      </motion.section>

      {/* === Footer === */}
      <footer className="text-center text-sm text-gray-500 border-t pt-6 pb-4 bg-gray-100">
        © {new Date().getFullYear()} Blogging Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
