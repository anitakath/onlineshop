import Link from "next/link"

import styles from './MobileNavigation.module.css'

const MobileNavigation = () =>{


    return (
      <nav className={styles.navigation}>
        <video autoPlay loop muted className={styles.background_video}>
          <source src="/videos/blue_air.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        
        <div className={styles.gradient_overlay}></div>

        <ul className={styles.nav_table}>
          <li>
            <Link href="/necklaces" className={styles.Link}>
              Necklaces
            </Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}>
              Necklaces
            </Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}>
              Necklaces
            </Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}>
              Necklaces
            </Link>
          </li>
          <li>
            <Link href="/necklaces" className={styles.Link}>
              Necklaces
            </Link>
          </li>
        </ul>
      </nav>
    );
}

export default MobileNavigation