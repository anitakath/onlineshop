

import {useState, useEffect, use} from 'react'

import Image from "next/image";


//STORE
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem } from "@/store/cartSlice";
//import { setSelectedProductt, setFilterProductArray, setUpdatedRandomProducts, setNewProduct } from '@/store/productSlice.js'
//import {setProducts, setRandomProductss, setShowProductts} from '@/store/productSlice.js'
import { incrementWishlist } from '@/store/wishlistSlice';

//STYLES
import styles from './exampleProducts.module.css'

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner, faCartPlus, faHeart,faXmark, faCaretDown} from '@fortawesome/free-solid-svg-icons'


const ExampleProducts = ({randomProductss, productss }) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    const randomProductIds = randomProducts.map((product) => product.id);
    const availableProducts = products.filter(
      (product) => !randomProductIds.includes(product.id)
    );

    setAvailableProducts(availableProducts);

  }, [products]);

  

  const wishlistItems = useSelector((state) => state.wishlist);


  useEffect(() => {
    if (randomProductss && productss && !initialized) {
      setRandomProducts(randomProductss);
      setProducts(productss);
      setShowProducts(true);
      setInitialized(true);
    }
  }, [productss, randomProductss, initialized]);

  const addProductHandler = (product) => {
    //füge das ausgewählte Produkt zum Warenkorb hinzu.
    dispatch(incrementItem(product));

    //füge dem Produkt den auserwählten Zustand zu, um es optisch verändert anzeigen zu lassen.
    dispatch(setSelectedProductt(product));
    setSelectedProduct(product);

    setTimeout(() => {
      // entferne nun das Produkt aus den Arrays
      const filterProductArray = products.filter((p) => p !== product);
      // aktualisiere das Produkte-Array mit den gefilterten Produktern
      setProducts(filterProductArray);

      const updatedRandomProducts = randomProducts.filter(
        (p) => p.id !== product.id
      );
      dispatch(setUpdatedRandomProducts(updatedRandomProducts));



      setSelectedProduct(null);


      // überprüfe, ob products noch Objekte hält

      setSelectedProduct(null);
    }, 1000);
  };


  /*----------------------------- RENDER PRODUCTS -----------------------------  */


   const [duplicateProduct, setDuplicateProduct] = useState(null);



  const likeProductHandler = (product) => {
    // Check whether the product is already in the wish list

    const duplicate = wishlistItems.find((item) => {
      return item.id === product.id;
    });

    if (duplicate != undefined) {
      setDuplicateProduct(product);

      setTimeout(() => {
        setDuplicateProduct(null);
      }, 3000);
      return;
    }

    // Add the selected product to the wish list
    dispatch(incrementWishlist(product));

    // Select and remove a random product from availableProducts
    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    const newRandomProduct = availableProducts[randomIndex];

    // Remove the clicked product from randomProducts...
    const updatedRandomProducts = randomProducts.filter(
      (p) => p.id !== product.id
    );

    // ... replace it with newRandomProduct

    const newRandomProducts = [...updatedRandomProducts, newRandomProduct];

    // remove newRandomProduct from availableProducts
    const updatedAvailableProducts = availableProducts.filter(
      (p) => p.id !== newRandomProduct.id
    );

    setAvailableProducts(updatedAvailableProducts);
    setRandomProducts(newRandomProducts);
  };

  

  /*----------------------------- RENDER PRODUCTS -----------------------------  */

  const renderProducts = () => {
    return randomProducts.map((product) => (
      <div
        className={`
           ${styles.productContainer}
           ${selectedProduct === product ? styles.selectedProduct : ""}
           ${duplicateProduct === product ? styles.duplicate : ""}
        `}
        key={product.id}
      >
        {product && product.img && (
          <Image
            src={product.img}
            alt="jajja"
            className={styles.product}
            width={300}
            height={300}
            priority={true}
          />
        )}
        <button
          className={styles.likeProductsBtn}
          onClick={() => likeProductHandler(product)}
        >
          <FontAwesomeIcon icon={faHeart} className={styles.heart} />
        </button>

        <button
          className={styles.addProductBtn}
          onClick={() => addProductHandler(product)}
        >
          <FontAwesomeIcon icon={faCartPlus} className={styles.icon} />
        </button>
        {duplicateProduct === product ? <p className={styles.duplicate_info}> product already @ wishlist </p> : <p></p>}
      </div>
    
    ));
  };

  useEffect(() => {
    if (randomProducts.length === 0) {
      setNoProducts(true);
    } else {
      setNoProducts(false);
    }
  }, [randomProducts]);

  const reloadrandomProductsHandler = () => {
    const randomArray = [];
    while (randomArray.length < 6) {
      const randomIndex = Math.floor(Math.random() * products.length);
      if (!randomArray.includes(products[randomIndex])) {
        randomArray.push(products[randomIndex]);
      }
    }

    setRandomProducts(randomArray);
  };

  const [showExampleproducts, setShowExampleProducts] = useState(true)


  const closeExampleProducts = () =>{

    setShowExampleProducts(!showExampleproducts)

  }



  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>you might like these products...</h2>
        <div className={styles.btn_div}>
          <button className={styles.close_btn} onClick={closeExampleProducts}>
            {showExampleproducts ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </button>
          <button className={styles.reload_btn}>
            <FontAwesomeIcon
              icon={faSpinner}
              className={styles.headerReloadIcon}
              onClick={reloadrandomProductsHandler}
            />
          </button>
        </div>
      </div>

      <div className={styles.productsContainer}>
        {!showProducts && <h1> loading products ... </h1>}
        {noProducts && (
          <p className={styles.products_info}>
            you have added all prodcuts to your cart ❤️{" "}
          </p>
        )}
        {showExampleproducts && renderProducts()}
      </div>
    </div>
  );
};

export default ExampleProducts;


