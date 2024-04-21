import Link from "next/link"

import styles from './MobileNavigation.module.css'

const MobileNavigation = () =>{


    return (
      <nav className={styles.navigation}>
        <ul className={styles.nav_table}>
          <li>
            <Link href="/necklaces" className={styles.Link}> Necklaces</Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}> Necklaces</Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}> Necklaces</Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}> Necklaces</Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}> Necklaces</Link>
          </li>
        </ul>
      </nav>
    );
}

export default MobileNavigation