

//REACT
import {useState, useEffect} from 'react'
//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem, deleteAllItems} from "@/store/cartSlice";
import { incrementWishlist } from '@/store/wishlistSlice'

import Layout from "@/components/Layout";


//STYLES
import styles from '../styles/Cart.module.css'
import Image from "next/image";


const Cart = () => {


  const [ isEmpty, setIsEmpty ] = useState(true)

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems)
  
  useEffect(()  =>{
     if (cartItems.length > 0) {
       setIsEmpty(false);
     }
     
  }, [])

 

 

  const totalPrice = cartItems.reduce((acc, item) =>{
    const price = item.price;
    const quantity = item.quantity;
    const amount = price * quantity
  

    return acc + amount
  }, 0)

  const fixedTotalPrice = totalPrice.toFixed(2)




  const increment = (item) =>{
    dispatch(incrementItem(item));
    
  }

  const decrement = (item) =>{
    dispatch(decrementItem(item))

  }

  useEffect(()=>{
    if (cartItems.length <= 0) {
      setIsEmpty(true);
    }
  }, [cartItems])

  console.log(isEmpty)


  


  const deleteItemHandler = (item) =>{
    console.log(item)
    dispatch(deleteAllItems(item));

  }



  return (
    <Layout>
      <div className={styles.cartFieldContainer}>
        <div className={styles.cartField}>
          {isEmpty && <h3 className={styles.emptyCartInfo}> You don't have any items in your shopping basket yet 🥺 </h3>}
          {cartItems.map((item) => {
            return (
              <div className={styles.cartItemContainer}>
                <div className={styles.cartItemImage}>
                  <Image
                    className={styles.image}
                    src={item.img}
                    alt="Beschreibung des Bildes"
                    width={200} // Setze hier die gewünschte Breite
                    height={200} // Setze- hier die gewünschte Höhe
                    priority={true}
                  />
                </div>

                <div className={styles.cartItemInfo}>
                  <div className={styles.cartItemTitle}>
                    <p>{item.name}</p>
                    <p> - {item.price}</p>
                  </div>

                  <div className={styles.cartItemTotal}>
                    <p className={styles.totalPrice}>
                      total ${item.totalPrice}
                    </p>
                  </div>

                  <div className={styles.cartItemEdit}>
                    <div className={styles.counter}>
                      <button onClick={() => decrement(item)}> - </button>
                      <p> {item.quantity} </p>
                      <button onClick={() => increment(item)}> + </button>
                    </div>
                    <div 
                    className={styles.cartItemDelete}
                    onClick={()=> deleteItemHandler(item)}
                    >delete</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.checkoutField}>
          <div className={styles.checkoutBtnContainer}>
            <p className={styles.totalPrice}> {fixedTotalPrice}$ </p>
            <button className={styles.checkoutBtn}> checkout </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
