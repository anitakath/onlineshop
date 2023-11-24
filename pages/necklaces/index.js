import React, { useEffect, useState } from "react";

//COMPONENTS
import Layout from "@/components/Layout";
//IMAGES
import Image from "next/image";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem } from "@/store/cartSlice";
import {incrementWishlist} from '@/store/wishlistSlice'

//STYLES
import styles from "../../styles/Necklaces.module.css";
import { decrement, increment } from "@/store/counterSlice";

const Necklaces = () => {

  const [necklacesData, setNecklacesData] = useState([]);
 
  
  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const response = await fetch("/api/necklacesData");
        const data = await response.json();
        console.log(data);
        setNecklacesData(data);
      } catch (error) {
        console.log(error);
      }

    }
    
    fetchData();
   

  
  }, [])
  

  console.log(necklacesData)



  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)

  console.log(cartItems)

  const counter = () =>{
    cartItems.map((item) => {
     return item.quantity
    })
  }
 



  const increment = (item) =>{
    
    dispatch(incrementItem(item))
    
  }

  const decrement = (item) =>{
    console.log(item)
    dispatch(decrementItem(item))
  }


  const wishlistItems = useSelector((state) => (state.wishlist))
  console.log(wishlistItems)

  const addToWishlistHandler = (item) =>{
    console.log('adding')
    console.log(item)
    dispatch(incrementWishlist(item));
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
                      className={styles.wishlist}
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

export default Necklaces;
