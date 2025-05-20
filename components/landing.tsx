import Link from "next/link";
import styles from "@/styles/Landing.module.css";

export default function Landing() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Welcome to SmartSpend!
        </h1>
        <p className={styles.heroSubtitle}>
          Get Started for Free Now!
        </p>
        <Link href="/signin">
          <button className={styles.button}>
            Start Now
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>
          Why Choose SmartSpend?
        </h2>
        <div className={styles.featuresGrid}>
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
              className={styles.featureCard}
            >
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to take control of your finances?</h2>
        <p className={styles.ctaText}>Join SmartSpend today – it's free!</p>
        <Link href="/signin">
          <button className={styles.ctaButton}>
            Create Your Account
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} SmartSpend. All rights reserved.</p>
      </footer>
    </main>
  )
}