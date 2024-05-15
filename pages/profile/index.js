import { useState } from "react";
import Layout from "@/components/Layout";


import styles from './UserProfile.module.css'

import {
  faPenToSquare,
  faCreditCard,
  faLock,
  faAddressCard,
  faGift,
  faCrown,
  faInfo,
  faRotateLeft,
  faBagShopping,
  faFaceFrownOpen
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

//COMPONENTS
import MyOrders from "@/components/profile/my-orders";


const UserProfile = () =>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  const [userProfile, setUserProfile] = useState("Start")

 
  const logoutHandler = () =>{
    dispatch(logout())
  }

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.userInformation_div}>
            <video autoPlay loop muted className={styles.background_video}>
              <source src="/videos/profileVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isLoggedIn && (
              <h1 className={styles.title}>
                you are not logged in. Please log in
                <Link href="/logon" className={styles.login_link}>
                  here
                </Link>
              </h1>
            )}

            {isLoggedIn && userProfile === "Start" && (
              <div className={styles.flex_div}>
                <div className={styles.flex}>
                  <ul
                    className={styles.profile_table}
                    style={{ borderBottom: "2px solid grey" }}
                  >
                    <li
                      style={{ background: "var(--font-hover-purple" }}
                      onClick={() => setUserProfile("MyOrders")}
                    >
                      <FontAwesomeIcon
                        icon={faBagShopping}
                        className={styles.icon}
                      />
                      <button className={styles.Link}>My orders</button>
                    </li>

                    <li>
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        className={styles.icon}
                      />
                      <button className={styles.Link}>My returns</button>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faInfo} className={styles.icon} />
                      <button className={styles.Link}> Help & F.A.Q.</button>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faCrown} className={styles.icon} />
                      <button className={styles.Link}>V.I.P</button>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faGift} className={styles.icon} />
                      <button className={styles.Link}> Gift cards & vouchers </button>
                    </li>
                  </ul>
                  <ul className={styles.profile_table}>
                    <li>
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className={styles.icon}
                      />
                      <button className={styles.Link}> My details</button>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLock} className={styles.icon} />
                      <button className={styles.Link}>Change password</button>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className={styles.icon}
                      />
                      <button className={styles.Link}>My payment methods</button>
                    </li>

                    <li>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={styles.icon}
                      />
                      <button className={styles.Link}>Contact</button>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faFaceFrownOpen}
                        className={styles.icon}
                      />
                      <button className={styles.Link} onClick={logoutHandler}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {isLoggedIn && userProfile === "MyOrders" && (
              <MyOrders
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            )}
          </div>
        </div>
      </Layout>
    );
}

export default UserProfile;