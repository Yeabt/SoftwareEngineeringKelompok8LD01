import Link from "next/link"
import styles from '@/styles/Navbar.module.css'

export const Navbar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    SmartSpend
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/signin" className={styles.navLink}>Sign-In</Link>
                    <Link href="/dashboard" className={styles.navLink}>Start Now</Link>
                </nav>
            </div>
        </header>
    )
}
