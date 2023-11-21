

import {useState, useEffect, use} from 'react'

import Image from "next/image";


//STORE
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem } from "@/store/cartSlice";


//STYLES
import styles from './exampleProducts.module.css'


const ExampleProducts = () =>{

    const [products, setProducts] = useState([])
    const [randomProducts, setRandomProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false)
    const [ selectedProduct, setSelectedProduct ] =useState(null)
    //const [removedProduct, setRemovedProduct] = useState(null)
    const [newProduct, setNewProduct] = useState('')



    useEffect(()=>{

        const fetchData = async() =>{
            try{
                const responseOne = await fetch("/api/necklacesData");
                const dataOne = await responseOne.json()
                const responseTwo = await fetch('/api/randomProductsData')
                const dataTwo = await responseTwo.json();
                const products = [...dataOne, ...dataTwo]

                setProducts(products)

                const randomArray = [];
                 while (randomArray.length < 5) {
                   const randomIndex = Math.floor(
                     Math.random() * products.length
                   );
                   if (!randomArray.includes(products[randomIndex])) {
                     randomArray.push(products[randomIndex]);
                     console.log(products[randomIndex]);
                   }
                 }


               setRandomProducts(randomArray);
               setShowProducts(true)

            } catch(error){
                console.log(error)
            }
        } 

        fetchData()

       

    }, [])

    


    const cartItems = useSelector( (state) => state.cart)
    const dispatch = useDispatch()

    

    
      


    const addProductHandler = (product) =>{


        //füge das ausgewählte Produkt zum Warenkorb hinzu.
        dispatch(incrementItem(product))

        //füge dem Produkt den auserwählten Zustand zu, um es optisch verändert anzeigen zu lassen.
        
        setSelectedProduct(product);

        
        setTimeout(() =>{


          // entferne nun das Produkt aus den Arrays
          const filterProductArray = products.filter((p) => p !== product);
          // aktualisiere das Produkte-Array mit den gefilterten Produktern
          setProducts(filterProductArray);

          const updatedRandomProducts = randomProducts.filter(
            (p) => p.id !== product.id
          );
          setRandomProducts(updatedRandomProducts);


          // überprüfe, ob products noch Objekte hält
          if (filterProductArray.length === 0) {
            console.log("alle Produkte gesehen");
          } else {
            let newProduct;
            let randomIndex;

            // Entferne gemeinsame Elemente zwischen filterProductArray und updatedRandomProducts
            const uniqueProducts = filterProductArray.filter(
              (product) =>
                !updatedRandomProducts.some((p) => p.id === product.id)
            );

            if (uniqueProducts.length === 0) {
              setRandomProducts([...updatedRandomProducts]);
              return;
            } else {
              randomIndex = Math.floor(Math.random() * uniqueProducts.length);
              newProduct = uniqueProducts[randomIndex];

              setNewProduct(newProduct);
              setRandomProducts([...updatedRandomProducts, newProduct]);

              if (randomProducts.length === 0) {
              }
            }
          }

          setSelectedProduct(null);
        }, 1000) 

    }

    const [noProducts, setNoProducts] = useState(true)


























    useEffect(()=>{

      //wenn randomProducts.length zwischen 1-5 liegt, dann bitte fülle randomProducts mit 
      // so vielen Objekten aus dem products array auf, bis wieder genau 5 objekte in randomProducts vorhanden sind



      setTimeout(() =>{
     

       

        if (randomProducts.length === 0) {
          setNoProducts(true);
        } else {
          setNoProducts(false);
        }

      }, 2000)
      
      

    }, [randomProducts])



   



 

    return (
      <div>
        <h2>you might like these products.</h2>
        <div className={styles.productsContainer}>
          {!showProducts && <h1> loading products ... </h1>}
          {noProducts && <p> you have added all prodcuts to your cart ❤️ </p>}
          {showProducts &&
            randomProducts.map((product) => (
              <div
                className={`${styles.productContainer} ${
                  selectedProduct === product ? styles.selectedProduct : ""
                }`}
              >
                <Image
                  src={product.img}
                  alt="jajja"
                  className={styles.product}
                  width={300}
                  height={300}
                  priority={true}
                />

                <button
                  className={styles.addProductBtn}
                  onClick={() => addProductHandler(product)}
                >
                  +
                </button>
              
              </div>
            ))}
        </div>
      </div>
    );
}

export default ExampleProducts;