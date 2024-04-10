
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//STYLES
import styles from '../../styles/Logon.module.css'

const Register = () =>{

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTouched, setIsTouched] = useState(false);



    const emailChangeHandler = (e) => {
      setEmail(e.target.value);
    };
    const passwordChangeHandler = (e) => {
      setPassword(e.target.value);
    };

    return (
      <div className={styles.registerContainer}>
        <h1> REGISTRATION </h1>
        <form className={styles.loginForm}>
          <label> NAME  </label>
          <input
            type="type"
            placeholder="PASSWORD"
            onChange={passwordChangeHandler}
          ></input>
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

          <label> REPEAT PASSWORD </label>
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={passwordChangeHandler}
          ></input>

          <button type="submit"> REGISTER </button>
        </form>
      </div>
    );
}

export default Register;