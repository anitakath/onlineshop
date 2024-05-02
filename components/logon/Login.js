

import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


//STORE
import {useDispatch, useSelector} from 'react-redux';
import { login, logout } from '@/store/authSlice';
import { setCurrentUser } from "@/store/currentUserSlice";

//STYLES
import styles from '../../styles/Logon.module.css'

//CUSTOM HOOK
import useFormHandler from "../custom hooks/useFormHandler";
import { current } from "@reduxjs/toolkit";


const Login = (props) =>{
  const formData = props.formData;
  const onChangeHandler = props.onChangeHandler;

  const emailBlurHandler = props.inputBlurHandler;
  const passwordBlurHandler = props.inputBlurHandler;


  const router = useRouter();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    currentUser,
    loading,
    isLoggedIn,
    submitHandlerr,
  } = useFormHandler();

  console.log(errorMessage)
  console.log(successMessage)
  console.log(currentUser)
  console.log(isLoggedIn)

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    onChangeHandler({ type: "email", value: e.target.value, action: "login" });
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    onChangeHandler({
      type: "password",
      value: e.target.value,
      action: "login",
    });
  };



 const [loginErrorMessage, setLoginErrorMessage] = useState("");
 const [loginSuccessMessage, setLoginSuccessMessage] = useState("");




 const submitHandler = async (e) => {
   e.preventDefault();

   await submitHandlerr(formData, "login", dispatch, router)



   //FIX FIX FIX FIX FIX FIX FIX!!!!
   // FIXEN!! momentan ist es noch so, dass der User 2x submitten muss, um sich einloggen zu können..
   
   if(isLoggedIn){
     console.log('yesyesyesyes')
     dispatch(login());

     dispatch(setCurrentUser(currentUser));

     setTimeout(() => {
       router.push("/profile");
     }, 2000); // Navigiere zur Seite /profile nach 2 Sekunden
   } else{
     console.log('nononononono')
   }


 };





 let btn_text = loading ? 'LOGGING IN ...' : 'LOGIN'

 console.log(formData)

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <h1 className={styles.title}> LOG IN </h1>
        <label> E-MAIL </label>
        <input
          type="email"
          placeholder="E-MAIL"
          onChange={emailChangeHandler}
          value={email}
          onBlur={emailBlurHandler}
          className={styles.input}
        ></input>

        <label> PASSWORD </label>
        <input
          type="password"
          placeholder="PASSWORD"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          className={styles.input}
        ></input>

        <button type="submit"> {btn_text} </button>
    
      </form>

      <p className={styles.error_msg}> {loginErrorMessage} </p>
      <p className={styles.success_msg}> {loginSuccessMessage} </p>

      <p className={styles.forgotPasswordLink}> Forgot your password? </p>
    </div>
  );
}

export default Login;