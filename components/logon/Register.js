
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//STYLES
import styles from '../../styles/Logon.module.css'

const Register = (props) =>{

    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("")

    const [isTouched, setIsTouched] = useState(false);


    const onChangeHandler = props.onChangeHandler;
    const submitHandler = props.submitHandler;


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

          <button type="submit"> REGISTER </button>
        </form>
      </div>
    );
}

export default Register;