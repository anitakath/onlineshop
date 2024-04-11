import Image from "next/image";
import styles from "./mobileSlider.module.css";
import { useState, useEffect } from "react";

const MobileSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.mobileMain}>
      <div className={styles.mobileMainSlider}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`${styles.mobileSlides} ${
              currentSlide === index ? styles.active : ""
            }`}
          >
            <Image
              src={`/randomProducts/vase${currentSlide}.jpg`}
              width={500}
              height={500}
              className={styles.imgs}
              alt="product images"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSlider;
