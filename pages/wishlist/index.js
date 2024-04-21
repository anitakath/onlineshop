//REACT
import { useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//COMPONENTS
import Layout from "@/components/Layout";
import Modal from "@/components/modal/Modal";
import ExampleProducts from "@/components/exampleProducts/exampleProducts";


//REDUX
import {useSelector, useDispatch} from 'react-redux'

//STYLES
import styles from '../../styles/Wishlist.module.css'
import styless from '../../styles/Modal.module.css'

import Image from "next/image";


//STORE
import { incrementItem } from "@/store/cartSlice";
import { decrementWishlist } from "@/store/wishlistSlice";

const Wishlist = () =>{

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [wishlist, setWishlist] = useState(false)
    const [addedItem, setAddedItem] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)


    const openModal = (item) => {
      setAddedItem(false)
        setWishlist(true)
        setSelectedItem(item)
        setModalIsOpen(true);
        console.log(item)
    };
     

    const closeModal = () => {
      if(wishlistItems.length === 0){
        setIsEmpty(true)
      }
        setModalIsOpen(false);
    };

  
    const wishlistItems = useSelector((state) => state.wishlist)

    useEffect(()=>{
      if(wishlistItems.length === 0){
        setIsEmpty(true)
      } else{
        setIsEmpty(false)
      }
    }, []);



    const dispatch = useDispatch();

    const addItemHandler = () => {
      console.log("moincito");
      dispatch(incrementItem(selectedItem));
      dispatch(decrementWishlist(selectedItem));
      setAddedItem(true)
      
    };

    console.log(wishlistItems)
    console.log(wishlist)
    console.log(selectedItem)

    useEffect(()=>{

      if(wishlistItems.length > 0){
        setIsEmpty(false)

      }

    }, [wishlistItems])



    const router = useRouter();

    const navigateToCartHandler = () => {
      console.log('hi')
      router.push("/cart"); 
    };

   ;

    return (
      <Layout>
        <div>
          <h1> HELLO </h1>

          {wishlist && (
            <div>
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className={styless.infoContainer}>
                  <Image
                    alt="Beschreibung des Bildes"
                    width={500} // Setze hier die gewünschte Breite
                    height={650} // Setze- hier die gewünschte Höhe
                    priority={true}
                    src={selectedItem.img}
                  />
                  <div className={styless.closeBtnContainer}>
                    <button onClick={closeModal} className={styless.closeBtn}>
                      X
                    </button>
                  </div>
                  <div className={styles.addToCartContainer}>
                    {!addedItem && (
                      <button
                        className={styless.addToCartBtn}
                        onClick={addItemHandler}
                      >
                        ADD TO CART
                      </button>
                    )}
                    {addedItem && (
                      <button className={styless.productInfo}>
                        product has been successfully added to your shopping
                        cart. <br />
                        <button
                          onClick={navigateToCartHandler}
                          className={styless.btn_toBasket}
                        >
                          {" "}
                          click here to go to your shopping basket
                        </button>
                      </button>
                    )}
                  </div>
                </div>
              </Modal>

              <h1> bye </h1>
            </div>
          )}
        </div>

        {isEmpty && (
          <div className={styles.noProducts_title}>
            <video autoPlay loop muted className={styles.background_video}>
              <source src="/videos/girl_road.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <h2 className={styles.title}> no products on your wishlist</h2>
          </div>
        )}

        {!isEmpty && (
          <div className={styles.wishlistField}>
            {wishlistItems.map((item) => {
              return (
                <div
                  onClick={() => openModal(item)}
                  className={styles.wishlistItem}
                  style={{ backgroundImage: `url(${item.img})` }}
                  key={item.id}
                >
                  <h1>{item.name}</h1>
                  <p className={styles.itemPrice}>{item.price}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.wrapper}>
          <div className={styles.examples_div}>
            <ExampleProducts />
          </div>
        </div>
      </Layout>
    );
}

export default Wishlist;