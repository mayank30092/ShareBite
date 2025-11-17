export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">About ShareBite 🌍</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Making food sharing simple, safe, and sustainable. Together, we’re
          building a community that cares.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          At <span className="font-semibold text-emerald-700">ShareBite</span>,
          our mission is to reduce food waste and hunger by connecting those
          with surplus food to those who need it most. We believe no meal should
          go to waste when so many go hungry.
        </p>
      </section>

      {/* Vision Section */}
      <section className="py-12 bg-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3076/3076403.png"
            alt="Share Food"
            className="w-64 mx-auto md:w-80"
          />
          <div>
            <h2 className="text-3xl font-bold text-emerald-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where food connects people — not divides them.
              Through our technology and partnerships, we aim to build a
              self-sustaining network of donors, volunteers, and beneficiaries
              that supports communities across cities and nations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-emerald-50 px-6">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-10">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              alt="Founder"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold text-emerald-700">
              Mr. Pradeep Gulati
            </h3>
            <p className="text-gray-600">Mentor</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
              alt="Co-founder"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold text-emerald-700">
              Mayank Mittal
            </h3>
            <p className="text-gray-600">Founder & Developer</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
              alt="Operations Lead"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold text-emerald-700">
              Mayank Singhal
            </h3>
            <p className="text-gray-600">Co-founder & Designer</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Join Our Movement</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">
          Be a part of something meaningful. Together, we can reduce waste and
          end hunger — one meal at a time.
        </p>
        <a
          href="/register"
          className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
}
