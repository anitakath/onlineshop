
import styles from './mobileSlider.module.css'

const MobileSlider = () =>{

    



    return (
      <div className={styles.mobileMain}>
        <div className={styles.mobileMainSlider}>
          <div className={styles.mobileSlides}></div>
          <div className={styles.mobileSlides}></div>
          <div className={styles.mobileSlides}></div>
          <div className={styles.mobileSlides}></div>
          <div className={styles.mobileSlides}></div>
        </div>
      </div>
    );
}

export default MobileSlider