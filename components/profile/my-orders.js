import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';


//COMPONENTS
import Button from './Button';

import styles from './ProfileComponents.module.css'

import Image from 'next/image';


import { useSelector } from 'react-redux';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedDate;
};

const MyOrders = ({ userProfile, setUserProfile }) => {
 
  const [orders, setOrders] = useState([]);



  const currentUserObject = useSelector((state) => state.currentUser.user);

  let currentUser = "";

  if (currentUserObject != null) {
    currentUser = currentUserObject.name;
  }




  useEffect(() => {
    const fetchOrders = async () => {

      const { data, error } = await supabase
        .from("SHOPNAME_myOrders")
        .select("*")
        .eq("email", currentUserObject.email)
        .order("orderId, created_at");

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        // Gruppiere die Bestellungen nach orderId und created_at
        const groupedOrders = data.reduce((acc, order) => {
          const key = `${order.orderId}-${order.created_at}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(order);
          return acc;
        }, {});

        // Konvertiere das gruppierte Objekt in ein Array von Bestellungen
        const formattedOrders = Object.values(groupedOrders);

        // Sortiere die Bestellungen nach der Bestellzeit (created_at)
        formattedOrders.sort(
          (a, b) => new Date(a[0].created_at) - new Date(b[0].created_at)
        );

        setOrders(formattedOrders);
      }
    };

    fetchOrders();
  }, []);


 


  return (
    <div className={styles.container}>
      <Button userProfile={userProfile} setUserProfile={setUserProfile} />

      {orders.map((orderGroup, index) => (
        <div key={index} className={styles.order_div}>
          <div className={styles.order_title_div}>
            <h2>Order {index + 1}</h2>
            <p> - {formatDate(orderGroup[0].created_at)}</p>
          </div>

          <ul>
            {orderGroup.map((order) => (
              <li key={order.id} className={styles.product_li}>
                {/* Hier kannst du die Details der Bestellung anzeigen */}
                <Image
                  src={order.img}
                  width={50}
                  height={50}
                  className={styles.image}
                />
                <p> {order.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h1 className={styles.title}> My Orders </h1>
    </div>
  );
};

export default MyOrders;