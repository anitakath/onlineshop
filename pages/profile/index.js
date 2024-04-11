
import Layout from "@/components/Layout";


import styles from './UserProfile.module.css'
const UserProfile = () =>{

    return (
      <Layout>
        <div className={styles.container}>
          <h1>user profile</h1>
          <div className={styles.userInformation_div}>
              user information
          </div>
        </div>
      </Layout>
    );
}

export default UserProfile;