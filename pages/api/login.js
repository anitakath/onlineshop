
import { supabase } from "@/services/supabaseClient";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});




export default async function handler(req, res) {

  //fetch existing user data from supabase

  const { data: users, error } = await supabase.from('SHOPNAME_users').select('*');


  function validateEmail(email) {
    const trimEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Der RegEx für E-Mail-Adressen

    if (!trimEmail || !emailRegex.test(trimEmail)) {
      return false;
    }

    return true;
  }




  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // post login data from frontend to backend

  if (req.method === "POST") {
    const { action, email, password, name, passwordRep } = req.body;

    /*--------------------- REGISTER ------------------------- */

    // Check if the action is 'register'
    if (action === "register") {
      // check if all inputs have values
      if (!name || !email || !password || !passwordRep) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      // Check if the email already exists in the database
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Additional validation for email and password

      // Additional validation for password length and match
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      if (password !== passwordRep) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      // Save new user to the database
      const newUser = await supabase
        .from("SHOPNAME_users")
        .insert([{ name, email, password, password_rep: passwordRep }]);

      return res
        .status(201)
        .json({ message: "  registered successfully", data: newUser });
    }

    /*--------------------- LOGIN ------------------------- */

    if (action === "login") {
      // check if all inputs have values
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      // check, if frontend data matches to one of the users @supabase
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      //if theres no match send an error telling the user to check their inputs || to make a  registration
      if (!user) {
        return res.status(401).json({
          error:
            "Invalid login information. The email address entered is not registered.",
        });
      }

      function escape(input) {
        // Ersetze alle < und > Zeichen durch ihre HTML-Entities
        input = input.replace(/</g, "&lt;");
        input = input.replace(/>/g, "&gt;");

        // Weitere Bereinigungen oder Ersetzungen können hier hinzugefügt werden

        return input;
      }

      escape(email);
      escape(password);

      const trimEmail = email.trim();
      const trimPassword = password.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Der RegEx für E-Mail-Adressen

      if (!trimEmail || !emailRegex.test(trimEmail)) {
        return res.status(400).json({
          error: "Ungültige E-Mail-Adresse",
        });
      }

      if (
        !trimPassword ||
        trimPassword.length < 6 ||
        trimPassword.length > 14
      ) {
        return res.status(400).json({
          error: "Ungültiges Passwort",
        });
      }

      return res.status(200).json({
        message: "login successful!",
        data: user,
      });
    }

    /*--------------------- NEWSLETTER ------------------------- */

    if (action === "newsletter") {
      if (!email) {
        return res.status(400).json({ error: "Please enter your email" });
      }

      validateEmail(email);

      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ error: "invalid email, please enter a valid email" });
      } else {
        return res.status(200).json({ message: "nice, gracias por tu email" });
      }
    }

    /*--------------------- NEWSLETTER ------------------------- */


    if(action === "reset"){
      return res.status(200).json({message: "HERE WE GOOOO "})
    }
  }


    
}
