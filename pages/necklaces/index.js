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


const Necklaces = ({necklacesData, info}) => {

  const [clickedItemId, setClickedItemId] = useState(null);


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


  const addToWishlistHandler = (item) =>{
    dispatch(incrementWishlist(item));
    setClickedItemId(item.product_id);
    
  }

  return (
    <Layout>
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
    </Layout>
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
