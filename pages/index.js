
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";


import Layout from '@/components/Layout';


//COMPONENTS

import WebSlider from '@/components/slider/WebSlider';
import MobileSlider from '@/components/slider/MobileSlider';
import NewsLetter from '@/components/call_to_actions/NewsLetter';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  return (
    <div className={styles.backgroundContainer}>

      <Layout>
        <WebSlider/>
        <MobileSlider/>
        
        <NewsLetter/>
      </Layout>

    </div>
  )
}
