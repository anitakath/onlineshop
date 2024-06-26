import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';


//COMPONENTS AND STYLES
import Button from './Button';
import styles from './ProfileComponents.module.css'


import Image from 'next/image';


import { useSelector } from 'react-redux';

//FONT AWESOME
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [loading, setLoading] = useState(false)



  const currentUserObject = useSelector((state) => state.auth.user);

  let currentUser = "";

  if (currentUserObject != null) {
    currentUser = currentUserObject.name;
  }




  useEffect(() => {
    const fetchOrders = async () => {

      setLoading(true)

      const { data, error } = await supabase
        .from("SHOPNAME_myOrders")
        .select("*")
        .eq("email", currentUserObject.email)
        .order("orderId, created_at");

      if (error) {
        //console.error("Error fetching orders:", error.message);
      } else {
        // Gruppiere die Bestellungen nach orderId und created_at


        setLoading(false)
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
    <div className={styles.wrapper}>

      
      <div className={styles.title_div}>
        {loading && (
          <div className={styles.loading_spinner_div}>
            <FontAwesomeIcon
              icon={faSpinner}
              className={styles.spinner_icon}
              spin
            />
            <p> loading your orders ... </p>
          </div>
        )}

        {orders.length === 0 && (
          <h2 className={styles.noOrdersMade_info}> no orders made yet </h2>
        )}
        <h1 className={styles.title}> My Orders </h1>
      </div>




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
      </div>
    </div>
  );
};

export default MyOrders;