

import { useState } from 'react';


//STYLES
import styles from '../../styles/Logon.module.css'

const Newsletter = (props) =>{

  const onChangeHandler = props.onChangeHandler;
  const submitHandler = props.submitHandler;

   const [email, setEmail] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    onChangeHandler({
      type: "email",
      value: e.target.value,
      action: "newsletter",
    });
  };

    return (
      <div className={styles.newsletterContainer}>
        <h1> NEWSLETTER </h1>
        <form className={styles.newsletterForm} onSubmit={submitHandler}>
          <label> email </label>
          <input
            type="email"
            placeholder="E-MAIL"
            onChange={emailChangeHandler}
          ></input>
          <button> NEWSLETTER </button>
        </form>
      </div>
    );
}

export default Newsletter;