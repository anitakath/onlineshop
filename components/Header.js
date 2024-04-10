import {useState} from 'react'
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



const Header = () =>{


    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const cartItems = useSelector((state) => state.cart)

    const quantities = cartItems.map((item) => item.quantity)

    const initialValue = 0;
    
    const sumQuantities = quantities.reduce(
      (acc, currVal) => acc + currVal,
      initialValue
    )

    let userGreeting = isLoggedIn ? 'ANNE' : 'USER'
    let loginPath = isLoggedIn ? '/user-profile' : '/logon'


    return (
      <div className={styles.headerContainer}>
        <h1> SHOPNAME </h1>

        <p className={styles.user_p}> HELLO 
          <Link href="/profile" className={styles.link}>{userGreeting}</Link> 
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