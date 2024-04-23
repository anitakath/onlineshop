

import { useRouter } from "next/router";
import { useState } from 'react';


//STORE
import {useDispatch, useSelector} from 'react-redux';
import { login, logout } from '@/store/authSlice';
import { setCurrentUser } from "@/store/currentUserSlice";

//STYLES
import styles from '../../styles/Logon.module.css'




const Login = (props) =>{
  const formData = props.formData;
  const onChangeHandler = props.onChangeHandler;

  const emailBlurHandler = props.inputBlurHandler;
  const passwordBlurHandler = props.inputBlurHandler;


  const router = useRouter();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
 const [loading, setLoading] = useState(false)

 const submitHandler = async (e) => {
   e.preventDefault();

   console.log("LOGIN ************************* ");
  
   setLoading(true)

   if (formData) {
     if (formData.action === null) {
       //console.log("no entries made");
       setLoginErrorMessage("please fill in the input fields");
     }
     if (formData.action === "login") {
       //console.log("trying to login ...");
       try {
         const response = await fetch("/api/login", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email: formData.email,
             password: formData.password,
           }),
         });

         const data = await response.json();

         if (response.ok) {
           dispatch(login());
           //console.log(response);
           console.log(data);
           setLoginSuccessMessage(data.message);
           setLoading(false)

            const currentUser = data.data.find(
              (user) =>
                user.email === formData.email &&
                user.password === formData.password
            );

       
            dispatch(setCurrentUser(currentUser));




           setTimeout(() => {
             // Navigiere zur Seite /profile nach 2 Sekunden
             router.push("/profile");
           }, 2000); // Zeit in Millisekunden (2 Sekunden = 2000ms)
           //router.push("/user-profile");
         } else {
           console.log(data.error);
           setLoginErrorMessage(data.error);
           setLoading(false)
         }
       } catch (error) {
         console.log("Fehler beim Einloggen", error);
       }
     }
   }
 };



 let btn_text = loading ? 'LOGGING IN ...' : 'LOGIN'


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