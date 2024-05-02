
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//STYLES
import styles from '../../styles/Logon.module.css'

const Register = (props) =>{


    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("")


    const onChangeHandler = props.onChangeHandler;
    const setFormData = props.setFormData;
    const formData = props.formData;

    console.log(formData)



    
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

    
  


    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [registrationLoading, setRegistrationLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const submitHandler = async (e) => {

      e.preventDefault();

      setRegistrationLoading(true)

      if(formData){
        if(formData.action === null){
          setErrorMessage("please fill in all input fields")
          setRegistrationLoading(false)
        }
        if(formData.action === "register"){
          try{

            //post data to /api/login 

            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                action: "register",
                name: formData.name,
                email: formData.email,
                password: formData.password,
                passwordRep: formData.passwordRep
              }),
            });


            

            const data = await response.json();

            console.log(data)

            if(data.error){
              setRegistrationLoading(false)
              setSuccessMessage("");
              setErrorMessage(data.error)
            } else {
              setRegistrationLoading(false)
              setErrorMessage("");
              setSuccessMessage(data.message);
              setName("");
              setEmail("");
              setPassword("");
              setPasswordRep("");
            }


          } catch (error){
            console.log('Failed to register', error)
          }
        }
      }
      
    };

    

   

    let btn_text = registrationLoading ? 'LOADING' : 'REGISTER'

     



    return (
      <div className={styles.registerContainer}>
        <form className={styles.loginForm} onSubmit={submitHandler}>
          <h1 className={styles.title}> REGISTRATION </h1>

          {error && <p className={styles.error_msg}>{error} </p>}
          {success && <p className={styles.success_msg}> {success} </p>}
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