

//COMPONENTS
import Layout from "@/components/Layout";
import Login from "@/components/logon/Login";
import Register from "@/components/logon/Register";
import Newsletter from "@/components/logon/Newsletter";

//STYLES
import styles from '../../styles/Logon.module.css'

const Logon = () =>{


    return (
      <Layout>
        <div className={styles.logonField}>
          <Login />
          <Register />
          <Newsletter />

        </div>
      </Layout>
    );
}

export default Logon;