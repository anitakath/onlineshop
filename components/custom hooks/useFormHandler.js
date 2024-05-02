import { useState } from "react"

//REDUX TOOLKIT
import { useDispatch } from "react-redux";
import { login, setCurrentUser } from "@/store/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


/*

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      throw new Error("Fehler beim Einloggen");
    }
  }
);

const submitHandlerr = async (formData, dispatch, router) => {
  try {
    setLoading(true);
    const data = await dispatch(loginUser(formData));

    setSuccessMessage(data.message);
    setCurrentUser(data.data);

    setTimeout(() => {
      router.push("/profile");
    }, 2000); // Navigiere zur Seite /profile nach 2 Sekunden
  } catch (error) {
    console.log("Fehler beim Einloggen", error);
    setErrorMessage(error.message);
  }
};

*/



const useFormHandler = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("")
    const [loading, setLoading] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch();

     const submitHandlerr = async (formData, action, dispatch, router) => {
       // Hier kommt der Code für das Formularhandling
       if (!formData) {
         return;
       }

       if (action === null) {
         setErrorMessage("Please fill in the input fields");
         return;
       }

       console.log(action)
       console.log(formData)



         if (action === "login") {

             try {
               setLoading(true);

               console.log("MOINCITOOOOO");
               console.log("LOGIN!!!!!!")

               const response = await fetch("/api/login", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                   action,
                   email: formData.email,
                   password: formData.password,
                 }),
               });

               const data = await response.json();

               if (data.error) {
                 setIsLoggedIn(false);
                 setLoading(false);
                 setErrorMessage(data.error);
               } else {
                 setLoading(false);
                 setIsLoggedIn(true);
                 //dispatch(login());
                 setSuccessMessage(data.message);
                 setCurrentUser(data.data);

                 if (
                   data.data &&
                   data.data.email === formData.email &&
                   data.data.password === formData.password
                 ) {
                   setCurrentUser(data.data);
                   //const currentUser = data.data;
                   //dispatch(setCurrentUser(currentUser));
                 }
               }
             } catch (error) {
               console.log("Fehler beim Einloggen", error);
             }


         }








         if (action === "register") {

             try {
               setLoading(true);

               console.log("MOINCITOOOOO");

               const response = await fetch("/api/login", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                   action,
                   email: formData.email,
                   password: formData.password,
                 }),
               });

               const data = await response.json();

               if (data.error) {
                 setIsLoggedIn(false);
                 setLoading(false);
                 setErrorMessage(data.error);
               } else {
                 setLoading(false);
                 setIsLoggedIn(true);
                 //dispatch(login());
                 setSuccessMessage(data.message);
                 setCurrentUser(data.data);

                 if (
                   data.data &&
                   data.data.email === formData.email &&
                   data.data.password === formData.password
                 ) {
                   setCurrentUser(data.data);
                   //const currentUser = data.data;
                   //dispatch(setCurrentUser(currentUser));
                 }
               }
             } catch (error) {
               console.log("Fehler beim Einloggen", error);
             }
         }
         


      


     };

     return {
       errorMessage,
       setErrorMessage,
       successMessage,
       setSuccessMessage,
       currentUser,
       loading, 
       isLoggedIn,
       submitHandlerr,
     };


}

export default useFormHandler

