

import { useRouter } from "next/router";
import Layout from "@/components/Layout";

import styles from './Checkout.module.css'

const Checkout = () =>{


    
   const router = useRouter();
   const { orderId } = router.query;

   console.log(orderId)

 




    return (
      <Layout>
        <div className={styles.container}>
          <h1> Thank you for your purchase! 🫶🏼 </h1>
          {orderId && <p> Your order number is: {orderId} </p>}
        </div>
      </Layout>
    );
}

export default Checkout;