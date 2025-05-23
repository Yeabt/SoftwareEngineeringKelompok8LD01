export default function About() {
  return (
    <>
    <p className="text-center font-bold text-5xl p-5">
      Who Are We?
    </p>

      <section className="mx-auto p-20 gap-20 flex flex-row items-center justify-center text-center bg-darkblue">
        <p className="text-justify md:text-xl mb-5 text-white">
          SmartSpend is an AI-powered personal finance tool designed to help users take control of their budgets with confidence.
          By seamlessly tracking income and expenses, SmartSpend provides intelligent insights, spending predictions, and personalized budget recommendations to promote smarter financial habits. With a clean, user-friendly interface and data-driven guidance,
          SmartSpend empowers individuals to make informed decisions, reduce financial stress, and achieve their savings goals—all in one intuitive platform.
        </p>
        <img src="images/images1.jpg" alt="My money!" width={500} height={500} />
      </section>

      <div className="bg-white">
        <p className="text-center font-bold text-5xl p-10 text-blue-700">
          What's our Mission?
        </p>
        <section className="mx-auto p-20 gap-20 flex flex-row items-center justify-center text-center">
          <img src="images/images2.jpg" alt="Yey save money" width={500} height={500} />
          <p className="text-justify md:text-xl mb-5 text-blue-700">
            At SmartSpend, our mission is to empower individuals to take control of their financial future with clarity and confidence.
            We combine intuitive design with AI-driven insights to make budgeting simple, personalized, and stress-free. 
            Whether you're tracking expenses, setting savings goals, or planning for big purchases, SmartSpend helps you make smarter financial decisions every day.
          </p>
        </section>
      </div>

      <footer className="bg-black color white text-center mt-auto py-6">
        <p>© {new Date().getFullYear()} SmartSpend. All rights reserved.</p>
      </footer>
      </>
  )
}
