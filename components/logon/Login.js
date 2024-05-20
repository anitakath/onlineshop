

import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


//STORE
import {useDispatch} from 'react-redux';
import { login, logout } from '@/store/authSlice';
import { setCurrentUser } from "@/store/authSlice";

//STYLES
import styles from '../../styles/Logon.module.css'

//CUSTOM HOOK
import useFormHandler from "../custom hooks/useFormHandler";

const Login = (props) =>{
  const formData = props.formData;
  const onChangeHandler = props.onChangeHandler;

  const emailBlurHandler = props.inputBlurHandler;
  const passwordBlurHandler = props.inputBlurHandler;

  const [forgotPassword, setForgotPassword] = useState(false)


  const router = useRouter();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("")
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


  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    onChangeHandler({ 
      type: "email", 
      value: e.target.value, 
      action: "login" });
  };
  const resetEmailChangeHandler = (e) => {
    setResetEmail(e.target.value);
      
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    onChangeHandler({
      type: "password",
      value: e.target.value,
      action: "login",
    });
  };


 const submitHandler = async (e) => {
  e.preventDefault();

  await submitHandlerr(formData, "login", dispatch, router)

 };



 useEffect(()=>{

   if (isLoggedIn) {
    dispatch(login());

    dispatch(setCurrentUser(currentUser));

    setTimeout(() => {
      router.push("/profile");
    }, 2000); // Navigiere zur Seite /profile nach 2 Sekunden
  }

 }, [isLoggedIn])


 let btn_text = loading ? 'LOGGING IN ...' : 'LOGIN'





 const forgotPasswordSubmitHandler = async (e) => {
   e.preventDefault();

   
   const response = await fetch("/api/reset-password", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email: resetEmail }),
   });

   if (response.ok) {

     const data = await response.json();
     setSuccessMessage(data.message);

   } else {

     const errorData = await response.json();
     setErrorMessage(errorData.error);
     
   }
   
 };





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
          value={password}
        ></input>

        <button type="submit"> {btn_text} </button>
      </form>

      <p className={styles.error_msg}> {errorMessage} </p>
      <p className={styles.success_msg}> {successMessage} </p>

      <div className={styles.forgotPassword_div}>
        <button
          className={
            forgotPassword
              ? styles.forgotPassword_btn_opaque
              : styles.forgotPassword_btn
          }
          onClick={() => setForgotPassword(!forgotPassword)}
        >
          Forgot your password?
        </button>

        {forgotPassword && (
          <div className={styles.input_div}>
            <form
              className={styles.submit_form}
              onSubmit={forgotPasswordSubmitHandler}
            >
              <label> please enter your email </label>
              <input
                type="email"
                className={styles.forgotPassword_input}
                value={resetEmail}
                onChange={resetEmailChangeHandler}
              />
              <button type="submit"> reset password </button>
            </form>

           
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;