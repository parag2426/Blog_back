const AboutPage = () => {
  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>

      {/* Mission Section */}
      <section className="mb-16 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          We believe blogging is more than just content — its about voice, community, and authenticity.
          Our mission is to empower individuals to share their thoughts, stories, and ideas freely with the world.
          We’re committed to helping people grow their presence with powerful tools and a supportive platform.
        </p>
      </section>

      {/* Image and Story Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
            alt="Founders"
            className="w-full object-cover"
          />
        </div>

        {/* Story */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed">
            Started as a small project by passionate bloggers, our platform was born out of the need for freedom of expression,
            minimal distractions, and an easy way to reach audiences globally. Over time, our community has grown into a diverse
            space where every voice matters. We continue to innovate and listen to our users to make blogging easier and more impactful.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <section className="text-center mt-20">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Blogging Platform. All rights reserved.</p>
      </section>
    </div>
  );
};

export default AboutPage;
