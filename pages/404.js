
import Link from "next/link";
import Image from "next/image";

//STYLES
import styles from '../styles/Custom404.module.css'


const Custom404 = () =>{

    return (
      <div className={styles.container}>
        <h1> diese Seite befindet sich im Aufbau 💕 </h1>
        <Image src="/404/potato.gif" width={300} height={300}></Image>
        <Link href="/" className={styles.link}> zurürck zur Startseite</Link>
      </div>
    );
}

export default Custom404;