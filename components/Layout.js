import Header from "./Header";

//STYLES
import styles from '../styles/Layout.module.css'

const Layout = ({children}) =>{

    return (
      <div className={styles.layoutContainer}>
        <Header />
        <div>{children}</div>
      </div>
    );
}

export default Layout