

import { useState } from 'react';


//STYLES
import styles from '../../styles/Logon.module.css'

const Newsletter = (props) =>{

  const onChangeHandler = props.onChangeHandler;
  const formData = props.formData
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");


  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    onChangeHandler({
      action: "newsletter",
      type: "email",
      value: e.target.value,
      action: "newsletter",
    });
  };

  const submitHandler = async (e) =>{
    e.preventDefault();

    if(formData){
      if (formData.action === "newsletter"){
        try{

          const response = await fetch("/api/login", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({     
            action: "newsletter",
            email: formData.email,
            password: formData.password,
           }),
          });

          const data = await response.json();

          if(data.error){
            setError(data.error)
            setSuccess("")


          } else{
            setSuccess(data.message)
            setError("")
            setEmail("")
          }

        } catch(error){
          //console.log(error)
        }
      }

    }
  }

    return (
      <div className={styles.newsletterContainer}>
        <form className={styles.newsletterForm} onSubmit={submitHandler}>
          <h1 className={styles.title}> NEWSLETTER </h1>
          <input
            type="email"
            placeholder="E-MAIL"
            onChange={emailChangeHandler}
          ></input>
          <button disabled={success !== ""} type="submit"> NEWSLETTER </button>
        </form>
        <p className={styles.error_msg}>{error}</p>
        <p className={styles.success_msg}>{success}</p>
      </div>
    );
}

export default Newsletter;