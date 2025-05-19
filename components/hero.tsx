export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-screen bg-gradient-to-b from-white to-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Welcome to SmartSpend!
      </h1>
      <p className="text-lg md:text-xl mb-6 text-gray-600">
        Get Started for Free Now!
      </p>
      <button className="text-white bg-orange-500 hover:bg-orange-600">
        Start Now
      </button>
    </section>
  )
}
