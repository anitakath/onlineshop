
//COMPONENTS
import Button from './Button';

import styles from './ProfileComponents.module.css'

const MyOrders = ({ userProfile, setUserProfile }) => {
 

  console.log(userProfile);

  const closeComponentHandler = () => {
   
  };


  return (
    <div className={styles.container}>
        <Button userProfile={userProfile} setUserProfile={setUserProfile} />
        <h1 className={styles.title}> My Orders </h1>



    </div>
  );
};

export default MyOrders;