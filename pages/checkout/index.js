
import Image from "next/image";


import { useRouter } from "next/router";
import Layout from "@/components/Layout";

import styles from './Checkout.module.css'

const Checkout = () =>{


    
   const router = useRouter();
   const { orderId } = router.query;

 


    return (
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}> Thank you for your purchase! 🫶🏼 </h1>
          {orderId && <p  className={styles.subtitle} > Your order number is: <br/>
          # <span className={styles.orderId}>{orderId}</span> </p>}
          
          <div className={styles.thanks_wrapper}>

             <Image src="/images/thankyou.jpg" className={styles.thanks_img} width={200} height={200} alt="thank you so much"></Image>

          </div>
        
        </div>
     
      </Layout>
    );
}

export default Checkout;