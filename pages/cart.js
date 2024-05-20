 import { v4 as uuidv4 } from 'uuid'; // Importiere die UUID-Bibliothek

//REACT
import {useState, useEffect} from 'react'

//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem, deleteAllItems} from "@/store/cartSlice";
import { useRouter } from 'next/router';


//STYLES
import styles from '../styles/Cart.module.css'
import Image from "next/image";


import { supabase } from '@/services/supabaseClient';



const Cart = () => {

  const router = useRouter();
  const [isEmpty, setIsEmpty] = useState(true);
  const [loginInfo, setLoginInfo] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUserObject = useSelector((state) => state.auth.user);

  // Extract the first name from the currentUser object
  let currentUser = "";
  if (currentUserObject != null) {
    currentUser = currentUserObject.name;
  }

  // get all cart items that the user had previously added to their cart
  const cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsEmpty(false);
    }
  }, []);

  // calculate the totalPrice from all cartitems
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.price;
    const quantity = item.quantity;
    const amount = price * quantity;

    return acc + amount;
  }, 0);

  const fixedTotalPrice = totalPrice.toFixed(2);


  const increment = (item) => {
    dispatch(incrementItem(item));
  };

  const decrement = (item) => {
    dispatch(decrementItem(item));
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      setIsEmpty(true);
    }
  }, [cartItems]);

  const deleteItemHandler = (item) => {
    dispatch(deleteAllItems(item));
  };

  let userName = isLoggedIn ? "ANNE, YOUR" : "YOUR";

  const [orderNum, setOrderNum] = useState(null);

  const checkoutHandler = async (e) => {
    e.preventDefault();

    if (currentUserObject != null) {
      const orderId = uuidv4();

      const cartItemsWithUniqueOrderId = cartItems.map((item) => ({
        ...item,
        id: uuidv4(),
        orderId: orderId,
        email: currentUserObject.email,
      }));

      const { data, error } = await supabase
        .from("SHOPNAME_myOrders")
        .insert(cartItemsWithUniqueOrderId);

      if (error) {
        console.error(
          "Failed to insert data into SHOPNAME_myOrders:",
          error.message
        );
        return;
      } else {
        setOrderNum(orderId);
      }
    } else if (isLoggedIn === false) {
      setLoginInfo(true);

      setTimeout(() => {
        router.push("/logon");
      }, 2000); //Scrollen nach 2 Sekunden
    }
  };

  if (orderNum) {
    router.push({
      pathname: "/checkout",
      query: { orderId: orderNum },
    });
  }

  return (
    <div>
      <div className={styles.cartFieldContainer}>
        <div className={styles.cartField}>
          <div className={styles.emptyCartInfoContainer}>
            {isEmpty && (
              <h3 className={styles.emptyCartInfo}>
                {userName} SHOPPING CART IS EMPTY 😔
              </h3>
            )}
          </div>

          {cartItems.map((item) => {
            return (
              <div className={styles.cartItemContainer} key={item.id}>
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
                    <p className={styles.item_name}>{item.name}</p>
                    <p className={styles.item_name}> - {item.price} $ </p>
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
            <div className={styles.subfield}>
              <h2 className={styles.title}> SUB TOTAL </h2>
              <p className={styles.totalPrice}> {fixedTotalPrice}$ </p>
            </div>

            <div className={styles.subfield}>
              <h2 className={styles.title}> SHIPPING </h2>
              <p className={styles.totalPrice}> 5.50$ </p>
            </div>

            <div className={styles.checkoutBtnContainer}>
              <button className={styles.checkoutBtn} onClick={checkoutHandler}>
                {loginInfo ? "please log in first " : "checkout"}
              </button>
            </div>

            <div className={styles.subfield_flex}>
              <h4> WE ACCEPT </h4>
              <div className={styles.flex_div}>
                <div className={styles.mini_div}></div>
                <div className={styles.mini_div}></div>
                <div className={styles.mini_div}></div>
                <div className={styles.mini_div}></div>
                <div className={styles.mini_div}></div>
                <div className={styles.mini_div}></div>
              </div>
            </div>

            <p className={styles.subtitle}>
              Do you have a discount code? Add it in the next step.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};





export default Cart;
