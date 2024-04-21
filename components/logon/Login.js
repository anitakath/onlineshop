

import { useRouter } from "next/router";
import { useState } from 'react';


//STORE
import {useDispatch, useSelector} from 'react-redux';
import { login, logout } from '@/store/authSlice';

//STYLES
import styles from '../../styles/Logon.module.css'




const Login = (props) =>{
  const formData = props.formData;
  const onChangeHandler = props.onChangeHandler;
  const submitHandler = props.submitHandler;
  const loginErrorMessage = props.loginErrorMessage;
  const inputBlurHandler = props.inputBlurHandler;
  const emailBlurHandler = props.inputBlurHandler;
  const passwordBlurHandler = props.inputBlurHandler;
  const loginSuccessMessage = props.loginSuccessMessage;

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



  return (
    <div className={styles.loginContainer}>
      <h1> LOG IN </h1>

      <form className={styles.loginForm} onSubmit={submitHandler}>
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

        <button type="submit"> LOG IN </button>
      </form>

      <p className={styles.error_msg}> {loginErrorMessage} </p>
      <p className={styles.success_msg}> {loginSuccessMessage} </p>

      <p className={styles.forgotPasswordLink}> Forgot your password? </p>
    </div>
  );
}

export default Login;