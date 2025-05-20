export default function Hero() {
  return (
    <section className="mx-auto p-20 gap-10 flex flex-row items-center justify-center text-center h-screen bg-darkblue">
      <p className="text-justify md:text-xl mb-6 text-white">
        SmartSpend is an AI-powered personal finance tool designed to help users take control of their budgets with confidence. 
        By seamlessly tracking income and expenses, SmartSpend provides intelligent insights, spending predictions, and personalized budget recommendations to promote smarter financial habits. With a clean, user-friendly interface and data-driven guidance,
        SmartSpend empowers individuals to make informed decisions, reduce financial stress, and achieve their savings goals—all in one intuitive platform.
      </p>
      <img src="/public/next.svg" alt="" width={500} height={500}/>
    </section>
  )
}
