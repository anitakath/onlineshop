


import styles from '../styles/Footer.module.css'

const Footer = () =>{
    return (
      <div className={styles.container}>
        <div className={styles.nav_div}>
          <h1 className={styles.nav_title}> About </h1>
          <ul className={styles.nav_table}>
            <li> About us </li>
            <li> Contact </li>
            <li> Career </li>
            <li> FAQ </li>
            <li> Blog </li>
            <li> Corporate responsibility </li>
          </ul>
        </div>

        <div className={styles.nav_div}>
          <h1 className={styles.nav_title}> Social </h1>

          <ul className={styles.nav_table}>
            <li> Instagram </li>
            <li> Facebook </li>
            <li> TikTok </li>
            <li> Pinterest</li>
          </ul>
        </div>

        <div className={styles.nav_div}>
          <h1 className={styles.nav_title}> And so on </h1>

          <ul className={styles.nav_table}>
            <li> Help </li>
            <li> Delivery & returns </li>
            <li> 12% Student Discount </li>
            <li> Cyber Security </li>
          </ul>
        </div>
      </div>
    );
}

export default Footer;