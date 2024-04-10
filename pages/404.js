
import Link from "next/link";
import Image from "next/image";

//STYLES
import styles from '../styles/Custom404.module.css'


const Custom404 = () =>{

    return (
      <div className={styles.container}>
        <h1> this page is under construction 💕 </h1>
        <p>
          have a look at the
          <Link href="/necklaces" className={styles.link}>
            necklace page
          </Link>
          you will already find a few products there
        </p>
        <Image src="/404/potato.gif" width={300} height={300}></Image>
        <Link href="/" className={styles.link}>
          back to the homepage
        </Link>
      </div>
    );
}

export default Custom404;