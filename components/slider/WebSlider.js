

import { useState, useEffect } from 'react';
import Link from 'next/link'


//STYLES
import styles from './WebSlider.module.css'
import Image from 'next/image';


//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";


const WebSlider = () =>{


  useEffect(() => {
    AOS.init();
  }, []);


  const [data, setData] = useState(false)

  const [currIdx, setCurrIdx] = useState(0)

  const slides = [
    {
      title: 'SHOP ',
      product: 'NECKLACES',
      link: '/necklaces'
    },
    {
      title: 'SHOP ',
      product: 'RINGS',
      link: '/rings'
    },
    {
      title: 'SHOP ',
      product: 'BRACELET',
      link: '/bracelet'
    },
    {
      title: 'SHOP ',
      product: 'HANDBAGS',
      link: '/handbags'
    },
    {
      title: 'SHOP ',
      product: 'DECOR',
      link: '/decor'
    }
  ]

  const [images, setImages] = useState([])
  const [loadImages, setLoadImages] = useState(false)

  useEffect(()=>{

    const fetchData = async() => {
      try{
        setLoadImages(true)
        const response = await fetch('/api/webSliderData')
        const data = await response.json()

        setImages(data)
        setData(true)
        setLoadImages(false)

      } catch(error){
        console.log(error)
      }

    }

    fetchData()

      
  }, [])





  const webSliderUpHandler = () =>{
    setCurrIdx((prevIdx) => (prevIdx + 1) % slides.length)
  }

   const webSliderDownHandler = () => {
     if(currIdx <= 0){
       setCurrIdx(slides.length)
     }
     setCurrIdx((prevIdx) => (prevIdx -1) % slides.length)

     console.log(currIdx)
   };






    return (
      <div className={styles.webSlider}>
        <div className={styles.sliderContainer} id="sliderContainer">
          <div className={styles.slides} id="leftSlides">
            <div
              className={styles.leftSlides}
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <h1>
                <Link href={slides[currIdx].link} className={styles.Link}>
                  {slides[currIdx].product}
                </Link>
              </h1>
            </div>
          </div>

          <div className={styles.slides} id="rightSlides">
            <div className={styles.rightSlides}>
              {loadImages && <p className={styles.loadImages}> lade Bilder... </p>}
              {data && !loadImages && (
                <Image
                  src={images[currIdx].image}
                  width={600}
                  height={800}
                  priority={true}
                  className={styles.sliderImage}
                  data-aos="fade-down"
                  data-aos-duration="2000"
                  alt={images[currIdx].name}
                ></Image>
              )}
            </div>
            ;
          </div>
        </div>

        <div className={styles.actionBtnContainer}>

          <button className={styles.btnContainer} onClick={webSliderUpHandler}>
            <FontAwesomeIcon icon={faArrowUp} className={styles.btnUp} />
          </button>

          <button className={styles.btnContainer} onClick={webSliderDownHandler}>
            <FontAwesomeIcon icon={faArrowDown} className={styles.btnDown} />
          </button>
        </div>
      </div>
    );
}

export default WebSlider