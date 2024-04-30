

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
import { login } from "@/store/authSlice";



const Logon = () =>{

 const dispatch = useDispatch();
 const router = useRouter();
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


 console.log(formData)



    return (
      <Layout>
        <div className={styles.logonField}>
          <div className={styles.wrapper}>
            <video autoPlay loop muted className={styles.background_video}>
              <source src="/videos/login_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <Login
              formData={formData}
              setFormData={setFormData}
              onChangeHandler={onChangeHandler}
            
           
            />
          </div>

          <div className={styles.wrapper}>
            <video autoPlay loop muted className={styles.background_video}>
              <source src="/videos/register_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <Register
              formData={formData}
              setFormData={setFormData}
              onChangeHandler={onChangeHandler}
       
            />
          </div>

          <div className={styles.wrapper}>


            <video autoPlay loop muted className={styles.background_video}>
              <source src="/videos/newsletter_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>


            <Newsletter
              formData={formData}
              setFormData={setFormData}
              onChangeHandler={onChangeHandler}
  
            />
          </div>
        </div>
      </Layout>
    );
}

export default Logon;