
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
    const setFormData = props.setFormData;
    const formData = props.formData;

    console.log(formData)
    //const submitHandler = props.submitHandler;


    
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

    
    /*

    const nameChangeHandler = (e) => {
      setName(e.target.value);
    };

    const emailChangeHandler = (e) => {
      setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
      setPassword(e.target.value);
    };

    const passwordRepChangeHandler = (e) => {
      setPasswordRep(e.target.value);
    };
    */


    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [registrationLoading, setRegistrationLoading] = useState(false)




    const submitHandler = async (e) => {

      e.preventDefault();

      console.log('REISTER ************************')

      if(formData){
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


            console.log(response)

            const data = await response.json();

            console.log(data)



          } catch (error){
            console.log('Failed to register', error)
          }
        }
      }

      setRegistrationLoading(true)


      /*
      
      try {
        const response = await fetch("/api/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });



        //const data = await response.json();

        //console.log(data.message)

        if (response.ok) {
          // Registrierung erfolgreich
          const data = await response.json();
          console.log(data.message);
          setRegistrationLoading(false)
          setError('')
          setSuccess(data.message)
        } else if (response.status === 409) {
          // Benutzer existiert bereits
          const errorData = await response.json();
          setRegistrationLoading(false);
          setSuccess('')
          setError(errorData.error);
        } else {
          // Andere Fehler behandeln
          const errorData = await response.json();
          setSuccess('')
          setRegistrationLoading(false);
          setError(errorData.error);
        }

        // Handle successful registration response here
      } catch (error) {
        console.error(error);
      }

      */
      
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
      </div>
    );
}

export default Register;