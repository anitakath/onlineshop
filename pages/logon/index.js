

//COMPONENTS
import Layout from "@/components/Layout";
import Login from "@/components/logon/Login";
import Register from "@/components/logon/Register";
import Newsletter from "@/components/logon/Newsletter";

//STYLES
import styles from '../../styles/Logon.module.css'


import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setUsers_data, setLoading} from "../../store/usersSlice";

import { useRouter } from "next/router";

const Logon = () =>{

 const dispatch = useDispatch();
 const [users, setUsers] = useState([]);

 useEffect(() => {
   dispatch(setLoading(true));

   const fetchData = async () => {
     try {
       const response = await fetch("/api/get-users");
       if (!response.ok) {
         throw new Error("Failed to fetch data");
       }
       const data = await response.json();
       setUsers(data);
       //console.log(data);

       dispatch(setLoading(false));
     } catch (error) {
       console.error(error);
     }
   };

   fetchData();
 }, []);

 useEffect(() => {
   dispatch(setUsers_data(users));
 }, [users]);



const [formData, setFormData] = useState({
  action: null, 
});

 const onChangeHandler = (e) =>{
   const {type, value, action} = e
  
   if (type === "email") {
     setFormData({
       ...formData,
       [type]: value,
       action,
     });
   } else if (type === "password") {
     setFormData({
       ...formData,
       [type]: value,
       action,
     });
   } else if (type === "name") {
      setFormData({
        ...formData,
        [type]: value,
        action,
      });
   } else if (type === "passwordRep") {
      setFormData({
        ...formData,
        [type]: value,
        action,
      });
   } else{
     console.log("no type found");
   }
 }
 
/* -------------------------------------------------------------- FIXEN!!!!!! */
 const submitHandler = async (e) =>{
   e.preventDefault();

   console.log('SUBMITCITOOOO')
   console.log(formData)

   if(formData){
     if(formData.action === "login"){
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
           //dispatch(login());
           console.log(response);
           console.log(data);

           const router = useRouter();
           //router.push("/user-profile");
         } else {
           console.log("Fehler beim Einloggen");
         }
       } catch (error) {
         console.log("Fehler beim Einloggen", error);
       }
       
     }


     else if(formData.action === "register"){
       console.log(formData)
     }
  
   }

   

 }





    return (
      <Layout>
        <div className={styles.logonField}>
          <Login
            formData={formData}
            setFormData={setFormData}
            onChangeHandler={onChangeHandler}
            submitHandler={submitHandler}
          />
          <Register
            formData={formData}
            setFormData={setFormData}
            onChangeHandler={onChangeHandler}
            submitHandler={submitHandler}
          />
          <Newsletter
            formData={formData}
            setFormData={setFormData}
            onChangeHandler={onChangeHandler}
            submitHandler={submitHandler}
          />
        </div>
      </Layout>
    );
}

export default Logon;