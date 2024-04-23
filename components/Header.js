import {useEffect, useState} from 'react'
import Link from 'next/link'


//REDUX
import {useSelector} from 'react-redux'

//STYLES
import styles from '../styles/Header.module.css'


//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser} from "@fortawesome/free-solid-svg-icons";

//STORE

import { supabase } from '@/services/supabaseClient';


const Header = () =>{


  const currentUserObject = useSelector((state) => state.currentUser.user);

  let currentUser = ""

   if (currentUserObject != null) {
     currentUser = currentUserObject.name;
   }


    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const cartItems = useSelector((state) => state.cart)

    const quantities = cartItems.map((item) => item.quantity)

    const initialValue = 0;
    
    const sumQuantities = quantities.reduce(
      (acc, currVal) => acc + currVal,
      initialValue
    )



    
    let loginPath = currentUserObject != null ? '/profile' : '/logon'


    /*
    useEffect(()=>{


      const fetchUser = async() =>{

        const { data, error } = await supabase
          .from("SHOPNAME_users")
          .select("*");


          console.log(data)
      }

      fetchUser()

    }, [isLoggedIn])*/



    return (
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.title}> SHOPNAME </Link>

        <p className={styles.user_p}>  hello {!currentUser && <span> you lovely person </span>}
          {currentUser && <Link href="/profile" className={styles.link}>{currentUser}  </Link> }
          ❤️
        </p>

        <div className={styles.userContainer}>
          <Link href="/" className={styles.Link}>
            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          </Link>

          <Link href="/wishlist" className={styles.Link}>
            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
          </Link>

          <Link href="/cart" className={styles.Link}>
            <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
            {sumQuantities}
          </Link>

          <Link href={loginPath} className={styles.Link}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </Link>
        </div>
      </div>
    );
}

export default Header;