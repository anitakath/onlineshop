import Header from "./Header";
import Footer from "./Footer";

//STYLES
import styles from '../styles/Layout.module.css'

const Layout = ({children}) =>{

    return (
      <div className={styles.layoutContainer}>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    );
}

export default Layout