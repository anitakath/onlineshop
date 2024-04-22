
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";

import Layout from '@/components/Layout';



//COMPONENTS

import WebSlider from '@/components/slider/WebSlider';
import MobileSlider from '@/components/slider/MobileSlider';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import NewsLetter from '@/components/call_to_actions/NewsLetter';


//HOOKS
import useSWR from 'swr'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const dispatch = useDispatch()


  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)

  const openMobileNavHandler = () =>{

    setMobileNavIsOpen(!mobileNavIsOpen)

  }

  let btnText = mobileNavIsOpen ? 'close' : 'open'
 

  return (
    <div className={styles.backgroundContainer}>
      <Layout>
        <WebSlider />

        <div className={styles.flex}>
          <button
            onClick={openMobileNavHandler}
            className={styles.openMobilenav_btn}
          >
            {btnText} menu
          </button>
          <video autoPlay loop muted className={styles.background_video}>
            <source src="/videos/blue_air.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {mobileNavIsOpen && <MobileNavigation />}
        <MobileSlider />

        <NewsLetter />
      </Layout>
    </div>
  );
}
