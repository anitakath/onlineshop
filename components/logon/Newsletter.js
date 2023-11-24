




//STYLES
import styles from '../../styles/Logon.module.css'

const Newsletter = () =>{

    return (
      <div className={styles.newsletterContainer}>
        <h1> SIGN UP FOR OUR NEWSLETTER </h1>
        <form className={styles.newsletterForm}>
            <label> email </label>
            <input type="email" placeholder="E-MAIL"></input>
            <button> NEWSLETTER </button>
        </form>
      </div>
    );
}

export default Newsletter;