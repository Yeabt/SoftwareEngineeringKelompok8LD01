import Link from "next/link"

export default function Landing() {
  return (
    <main className="bg-lightgray text-black min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-darkblue mb-4">
          Welcome to SmartSpend!
        </h1>
        <p className="text-lg md:text-xl mb-6 text-black">
          Get Started for Free Now!
        </p>
        <Link href="/get-started">
          <button className="bg-yellow text-black font-semibold py-3 px-6 rounded-lg hover:bg-darkblue hover:text-white transition">
            Start Now
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-lightgray py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-darkblue mb-10">
          Why Choose SmartSpend?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Track Your Expenses",
              desc: "Monitor your spending habits with real-time insights.",
            },
            {
              title: "Smart Budgeting",
              desc: "Set limits and get notified when you're overspending.",
            },
            {
              title: "AI Predictions",
              desc: "Let our AI predict your future expenses and income trends.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-darkblue mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-darkblue text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
        <p className="text-lg mb-6">Join SmartSpend today – it's free!</p>
        <Link href="/signup">
          <button className="bg-yellow text-black font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-darkblue transition">
            Create Your Account
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} SmartSpend. All rights reserved.</p>
      </footer>
    </main>
  )
}
