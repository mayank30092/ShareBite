export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-20 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          About ShareBite 🌍
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
          Making food sharing simple, safe, and sustainable. Together, we’re
          building a community that cares.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
          At <span className="font-semibold text-emerald-700">ShareBite</span>,
          our mission is to reduce food waste and hunger by connecting those
          with surplus food to those who need it most — ensuring every meal
          reaches the right hands.
        </p>
      </section>

      {/* Vision Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3076/3076403.png"
            alt="Share Food"
            className="w-48 md:w-72 mx-auto rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
          />

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-emerald-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where food connects people — not divides them.
              Through technology, compassion, and community support, we aim to
              build a sustainable network of donors, volunteers, and
              beneficiaries across cities and nations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-emerald-50 px-6">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-10">
          Meet Our Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {[
            {
              name: "Mrs. Jasleen Kaur Bhatia",
              role: "Mentor",
              img: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
            },
            {
              name: "Mayank Mittal",
              role: "Founder & Developer",
              img: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
            },
            {
              name: "Mayank Singhal",
              role: "Co-founder & Designer",
              img: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold text-emerald-700">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Movement
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-lg opacity-90">
          Be a part of something meaningful. Together, we can reduce waste and
          end hunger — one meal at a time.
        </p>
        <a
          href="/register"
          className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 shadow-md transition-all"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
}
