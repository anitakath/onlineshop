


//STYLES
import styles from '../../styles/ProductRoulette.module.css'
import Image from 'next/image';

//LAYOUT
import Layout from '@/components/Layout';

const ProductRoulette = () =>{

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.matchField}>
            <h2>  find your match </h2>
            <button className={styles.wishlist}> WISHLIST </button>
            <Image
              src="/necklaces/necklaceAlisha.jpg"
              width={300}
              height={400}
              className={styles.image}
            ></Image>
            <button className={styles.cart}> ADD TO CART </button>
            <button className={styles.delete}> DELETE </button>
          </div>
        </div>
      </Layout>
    );
}

export default ProductRoulette;