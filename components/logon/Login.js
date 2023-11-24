

import { useRouter } from "next/router";
import { useState } from 'react';


//STORE
import {useDispatch, useSelector} from 'react-redux';
import { login, logout } from '@/store/authSlice';

//STYLES
import styles from '../../styles/Logon.module.css'

const Login = () =>{

  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ isTouched, setIsTouched] = useState(false)


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const emailChangeHandler = (e) =>{
    setEmail(e.target.value)
  }
  const passwordChangeHandler = (e) =>{
    setPassword(e.target.value)
  }

 

  const loginHandler = async (e) =>{
    e.preventDefault();

    if(email && password){
      try{
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if(response.ok){

          dispatch(login());
          console.log(response)
          console.log(data)


          const router = useRouter();
          router.push("/user-profile");


        } else{
          console.log('Fehler beim Einloggen')
        }


      } catch(error){
         console.log("Fehler beim Einloggen", error);
      }
      
    } else{
      console.log('enter email and password!')
    }
    

  }

  
    return (
      <div className={styles.loginContainer}>
        <h1> LOG IN WITH YOUR ACCOUNT</h1>



        <form className={styles.loginForm} onSubmit={loginHandler}>
          <label> E-MAIL </label>
          <input 
            type="email" 
            placeholder="E-MAIL"
            onChange={emailChangeHandler}

            ></input>

          <label> PASSWORD </label>
          <input 
            type="password" 
            placeholder="PASSWORD"
            onChange={passwordChangeHandler}
            ></input>

          <button type="submit"> MY ACCOUNT </button>
        </form>
        <p className={styles.forgotPasswordLink}> Forgot your password? </p>
      </div>
    );
}

export default Login;