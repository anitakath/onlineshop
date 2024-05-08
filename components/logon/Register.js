
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


import { useRouter } from 'next/router';
//STYLES
import styles from '../../styles/Logon.module.css'



//CUSTOM HOOK
import useFormHandler from '../custom hooks/useFormHandler';



const Register = (props) =>{

    const dispatch = useDispatch();
    const router = useRouter();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("")


    const onChangeHandler = props.onChangeHandler;
    const formData = props.formData;



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


    
    const nameChangeHandler = (e) => {
      setName(e.target.value);
      onChangeHandler({
        type: "name",
        value: e.target.value,
        action: "register",
      });
    };

    const emailChangeHandler = (e) => {
      setEmail(e.target.value);
      onChangeHandler({
        type: "email",
        value: e.target.value,
        action: "register",
      });
    };

    const passwordChangeHandler = (e) => {
      setPassword(e.target.value);
      onChangeHandler({
        type: "password",
        value: e.target.value,
        action: "register",
      });
    };

    const passwordRepChangeHandler = (e) => {
      setPasswordRep(e.target.value);
      onChangeHandler({
        type: "passwordRep",
        value: e.target.value,
        action: "register",
      });
    };

    


     const submitHandler = async (e) => {
       e.preventDefault();


       await submitHandlerr(formData, "register", dispatch, router);
     };


     useEffect(()=>{
      if(successMessage){

        // clear inputs, when registration successfully
        setName("");
        setEmail("");
        setPassword("");
        setPasswordRep("");
  
      }

     }, [successMessage])


   

    let btn_text = loading ? 'LOADING' : 'REGISTER'

     



    return (
      <div className={styles.registerContainer}>
        <form className={styles.loginForm} onSubmit={submitHandler}>
          <h1 className={styles.title}> REGISTRATION </h1>

       
          <input
            type="type"
            placeholder="NAME"
            onChange={nameChangeHandler}
            value={name}
          ></input>

          <label> E-MAIL </label>
          <input
            type="email"
            placeholder="E-MAIL"
            onChange={emailChangeHandler}
            value={email}
          ></input>

          <label> PASSWORD </label>
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={passwordChangeHandler}
            value={password}
          ></input>

          <label> REPEAT PASSWORD </label>
          <input
            type="password"
            placeholder="REPEAT PASSWORD"
            onChange={passwordRepChangeHandler}
            value={passwordRep}
          ></input>

          <button type="submit"> {btn_text} </button>
        </form>
        {errorMessage && <p className={styles.error_msg}> {errorMessage} </p>}
        { successMessage && <p className={styles.success_msg}> {successMessage}</p>}
      </div>
    );
}

export default Register;