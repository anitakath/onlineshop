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



const Header = () =>{
  const currentUserObject = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  /*
  sensitive user data follows!!!
   is it enough to remove the console.log(...) before publishing the website 
   so that users do not have access to the user data later when they open the DevTools?
    or can they still enter the console.log(...) via the devtools? 
  */
  //console.log(currentUserObject);

  let currentUser = "";

  if (currentUserObject != null) {
    currentUser = currentUserObject.name;
  }

  const cartItems = useSelector((state) => state.cart);

  const quantities = cartItems.map((item) => item.quantity);

  const initialValue = 0;

  const sumQuantities = quantities.reduce(
    (acc, currVal) => acc + currVal,
    initialValue
  );

  let loginPath = currentUserObject != null ? "/profile" : "/logon";

  return (
    <div className={styles.headerContainer}>
      <Link href="/" className={styles.title}>
        SHOPNAME
      </Link>

      <p className={styles.user_p}>
        {" "}
        hello {!isLoggedIn && <span> you lovely person </span>}
        {isLoggedIn && (
          <Link href="/profile" className={styles.link}>
            {currentUser}{" "}
          </Link>
        )}
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
          <span className={styles.sumQuantities}>{sumQuantities}</span>
        </Link>

        <Link href={loginPath} className={styles.Link}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}

export default Header;