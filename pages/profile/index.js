
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
import { useSelector } from "react-redux";

const UserProfile = () =>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn)

    /*  <video controls>
              <source src="/videos/Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> 
            */



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
                you are not logged in. Please log in <Link href="/logon" className={styles.login_link}> here</Link>
              </h1>
            )}

            {isLoggedIn && (
              <div>
                <h1 className={styles.title}> HI DU </h1>
                <div className={styles.flex}>
                  <ul className={styles.profile_table}>
                    <li>
                      <FontAwesomeIcon
                        icon={faBagShopping}
                        className={styles.icon}
                      />
                      <Link href="/" className={styles.Link}>
                        My orders
                      </Link>
                    </li>

                    <li>
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        className={styles.icon}
                      />
                      <Link href="/" className={styles.Link}>
                        My returns
                      </Link>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faInfo} className={styles.icon} />
                      <Link href="/" className={styles.Link}>
                        {" "}
                        Help & F.A.Q.
                      </Link>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faCrown} className={styles.icon} />
                      <Link href="/" className={styles.Link}>
                        V.I.P
                      </Link>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faGift} className={styles.icon} />
                      <Link href="/" className={styles.Link}>
                        {" "}
                        Gift cards & vouchers{" "}
                      </Link>
                    </li>
                  </ul>
                  <ul className={styles.profile_table}>
                    <li>
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className={styles.icon}
                      />
                      <Link href="/" className={styles.Link}>
                        {" "}
                        My details
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLock} className={styles.icon} />
                      <Link href="/" className={styles.Link}>
                        {" "}
                        Change password{" "}
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className={styles.icon}
                      />
                      <Link href="/" className={styles.Link}>
                        My payment methods
                      </Link>
                    </li>

                    <li>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={styles.icon}
                      />
                      <Link href="/" className={styles.Link}>
                        Contact
                      </Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faFaceFrownOpen}
                        className={styles.icon}
                      />
                      <Link href="/" className={styles.Link}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
}

export default UserProfile;