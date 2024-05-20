import React, { useState } from "react";

//COMPONENTS
import Layout from "@/components/Layout";
//IMAGES
import Image from "next/image";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem } from "@/store/cartSlice";
import {incrementWishlist} from '@/store/wishlistSlice'

//STYLES
import styles from "./Necklaces.module.css";

//SUOABASE
import { supabase } from "@/services/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";


const Necklaces = ({necklacesData, info}) => {

  const [clickedItemId, setClickedItemId] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)



  if (!necklacesData) {
    return <p> loading...</p>;
  }


  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)
 

  const increment = (item) =>{
    
    dispatch(incrementItem(item))
    
  }

  const decrement = (item) =>{
    dispatch(decrementItem(item))
  }


  const addToWishlistHandler = async (item) =>{

    if (isLoggedIn){
      console.log('user is logged in. send item (object) to supabase!')
      console.log(item)
      try {
        const response = await fetch("/api/addToWishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item }),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }

    } else{
      console.log('user is not logged in, store item (object) at redux stoarge')
      dispatch(incrementWishlist(item));
    }
    
    console.log(item);
    
    setClickedItemId(item.product_id);
    
  }

  return (
    <div>
      <div className={styles.itemContainer}>
        {necklacesData.map((necklace) => {
          const cartItem = cartItems.find((item) => item.id === necklace.id)
          const quantity = cartItem ? cartItem.quantity : 0;

        
          return (
            <div className={styles.item} key={necklace.id}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={necklace.img}
                  alt="Beschreibung des Bildes"
                  width={200} // Setze hier die gewünschte Breite
                  height={200} // Setze- hier die gewünschte Höhe
                  priority={true}
                />
                <div className={styles.itemInfo}>
                  <p> {necklace.name}</p>
                  <p> {necklace.price} $</p>
                  
                </div>
                <div className={styles.itemInfo}>
                  <div className={styles.wishlistContainer}>
                    <button
                      className={`${styles.wishlist} ${clickedItemId === necklace.id ? styles.clicked : ''}`}
                      onClick={() => addToWishlistHandler(necklace)}
                   
                    > ❤️ </button>


                  </div>
                  <div className={styles.itemInfoCounter}>
                    <button onClick={() => decrement(necklace)}> - </button>
                    <h2> {quantity} </h2>
                    <button onClick={() => increment(necklace)}> + </button>
                  </div>
                </div>
              </div>
            </div>
          );


        })}
      </div>
    </div>
  );
};


export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:3000/api/necklacesData");
    const data = await response.json();


    return {
      props: {
        necklacesData: data,
        info: "this ✨ comes via getStaticProps "
      },
    };
  } catch (error) {
    //console.log(error);
    return {
      props: {
        necklacesData: [],
      },
    };
  }
}


export default Necklaces;
