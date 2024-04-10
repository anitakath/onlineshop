

import styles from './NewsLetter.module.css'

const NewsLetter = () =>{

    return (
      <div className={styles.container}>
        <h1> sign up for our newsletter </h1>
        <form className={styles.input_form}>
          <input 
            type="email" 
            className={styles.email_input} 
            placeholder="your@email.com" 
          />
          <button type="submit" className={styles.signUp_btn}> sign up </button>
        </form>
      </div>
    );
}


export default NewsLetter