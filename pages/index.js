
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";


import Layout from '@/components/Layout';


//COMPONENTS
import Start from '@/components/Start';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  /*
  const count = useSelector((state)=> state.counter)
  console.log(count)
  const dispatch = useDispatch()
  console.log(dispatch)

  const incrementHandler = (e) =>{
    e.preventDefault()

    dispatch(increment())

  }

  const decrementHandler = (e) =>{
     e.preventDefault();

     dispatch(decrement())

  }


  const [person, setPerson] = useState('')
  const [age, setAge] = useState('')
  const [dish, SetDish] = useState('')

  const changeNameHandler = (e) =>{
      setPerson(e.target.value);
  }

   const changeAgeHandler = (e) => {
     setAge(e.target.value);
   };

   const changeDishhandler = (e) =>{
     SetDish(e.target.value)
   }



  //console.log(person);
  const addPersonHandler = (e) =>{
    e.preventDefault();

    if(person && age && dish){
      const personX= {
        person,
        age, 
        dish
      }
      dispatch(addPerson(personX))
      

    }else{
      console.log('please enter a name!')
    }
 

  }

  const theAdressBook = useSelector((state) => state.adressBook)
  console.log(theAdressBook)



    const removePersonHandler = (personId) => {
      dispatch(removePerson(personId));
    };
    *//*
    <div>
      <div className="counterField">
        <h1>{count}</h1>
        <div className="actionBtnField">
          <button onClick={incrementHandler}> increment </button>
          <button onClick={decrementHandler}> decrement </button>
        </div>
      </div>

      <div className="adressBookField">
        <ul>
          {theAdressBook.map((person, index) => (
            <li key={person.id} onClick={() => removePersonHandler(person.id)}>
              {person.person}, {person.age}, {person.dish} 
            </li>
          ))}
        </ul>
        <form onSubmit={addPersonHandler}>
          <input
            type="text"
            placeholder="name"
            onChange={changeNameHandler}
            value={person}
          ></input>
          <input
            type="number"
            placeholder="age"
            onChange={changeAgeHandler}
            value={age}
          />
          <select onChange={changeDishhandler}>
            <option value="salmon"> salmon </option>
            <option value="steak"> steak </option>
            <option value="veggieburger"> veggieburger </option>
            <option value="cordonbleu"> vegan cordon bleu </option>
          </select>
          <button type="submit">add person</button>
        </form>
      </div>
    </div>
  );
  */
    

  return (
    <div className={styles.backgroundContainer}>

      <Layout>
        <Start/>
        
      </Layout>

    </div>
  )
}
