

//REACT
import {useState, useEffect} from 'react'
//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem, deleteAllItems} from "@/store/cartSlice";
import { incrementWishlist } from '@/store/wishlistSlice'
import { login, logout } from '@/store/authSlice'
import { useRouter } from 'next/router';

import Layout from "@/components/Layout";

//COMPONENTS
import Login from '@/components/logon/Login';
import Register from '@/components/logon/Register';
import Newsletter from '@/components/logon/Newsletter';


//STYLES
import styles from '../styles/Cart.module.css'
import Image from "next/image";
import Link from 'next/link';


const Cart = () => {


  const router = useRouter()
  const [ isEmpty, setIsEmpty ] = useState(true)
  const [loginInfo, setLoginInfo] = useState(false)


  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  console.log(isLoggedIn)


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

  let userName = isLoggedIn  ? 'ANNE, YOUR' : 'YOUR'



  const checkoutHandler = (e) =>{
    e.preventDefault();
    if(isLoggedIn === true){
      router.push('/checkout')
    } else if(isLoggedIn === false){
      setLoginInfo(true);

     setTimeout(() => {
       const logonWrapper = document.querySelector(`.${styles.logonWrapper}`);
       logonWrapper.scrollIntoView({ behavior: "smooth" });
     }, 1000); //Scrollen nach 1 Sekunde

     
    }
    
  }


useEffect(() => {
  const checkoutField = document.querySelector("." + styles.checkoutField);
  const logonWrapper = document.querySelector("." + styles.logonWrapper);

  function handleScroll() {

    if(checkoutField){

      console.log(logonWrapper.offsetTop)
      if (window.pageYOffset > (logonWrapper.offsetTop -420)) {
        checkoutField.style.top = "120px";
        checkoutField.style.position = "relative";
        checkoutField.style.right = "0px"
        checkoutField.style.justifyContent = "end";
      } else {
        checkoutField.style.position = "fixed";
        checkoutField.style.right = "60px";
      }
    }
    
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [isEmpty]);





  return (
    <Layout>
      <div className={styles.cartFieldContainer}>

        <div className={styles.cartField}>
          <div className={styles.emptyCartInfoContainer}>
            {isLoggedIn && <p> ja {isLoggedIn} </p>}

            {isEmpty && (
              <h3 className={styles.emptyCartInfo}>
                {userName} SHOPPING CART IS EMPTY 😔
              </h3>
            )}
          </div>

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
                    <p> - {item.price} </p>
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
                      onClick={() => deleteItemHandler(item)}
                    >
                      delete
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isEmpty && (
          <div className={styles.checkoutField}>
            <div className={styles.checkoutBtnContainer}>
              <p className={styles.totalPrice}> {fixedTotalPrice}$ </p>
              <button className={styles.checkoutBtn} onClick={checkoutHandler}>
                {loginInfo ? 'please log in first ' : 'checkout'}
              </button>
            </div>
           
          </div>
        )}


        
      </div>






      {!isLoggedIn && (
        <div className={styles.logonWrapper}>
          <div className={styles.logonContainer}>
            <Login />
            <Register />
          </div>
        </div>
      )}
    </Layout>
  );
};





export default Cart;
