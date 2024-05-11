
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';
import {useSelector} from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";


import Layout from '@/components/Layout';


//ANIMATIONS
import { Transition } from 'react-transition-group';
import { gsap } from "gsap";

//COMPONENTS

import WebSlider from '@/components/slider/WebSlider';
import MobileSlider from '@/components/slider/MobileSlider';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import NewsLetter from '@/components/call_to_actions/NewsLetter';


//HOOKS
import useSWR from 'swr'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {



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
        </div>

        <Transition
          timeout={2000}
          mountOnEnter
          unmountOnExit
          in={mobileNavIsOpen}
          onEntering={(node) => {
            gsap.fromTo(
              node,
              0.5,
              {
                y: -100,
                autoAlpha: mobileNavIsOpen ? 0 : 1,
              },
              {
                y: 0,
              }
            );
          }}
          addEndListener={(node, done) => {
            gsap.to(node, 0.5, {
              y: mobileNavIsOpen ? 0 : -100,
              autoAlpha: mobileNavIsOpen ? 1 : 0,
              onComplete: done,
            });
          }}
        >
          <MobileNavigation mobileNavIsOpen={mobileNavIsOpen} />
        </Transition>

        <Transition
          timeout={2000}
          mountOnEnter
          unmountOnExit
          in={mobileNavIsOpen}
          onEntering={(node) => {
            gsap.fromTo(
              node,
              { y: 0 },
              { duration: 1, y: mobileNavIsOpen ? 0 : 0 }
            );
          }}
          addEndListener={(node, done) => {
            gsap.to(node, {
              duration: 0.5,
              y: mobileNavIsOpen ? 0 : -100,
              onComplete: done,
            });
          }}
        >
          <MobileSlider />
        </Transition>

        {!mobileNavIsOpen && <MobileSlider />}

        <NewsLetter />
      </Layout>
    </div>
  );
}
