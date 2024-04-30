
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



  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // post login data from frontend to backend

  if (req.method === "POST") {
    const { action, email, password, name, passwordRep } = req.body;


    // Check if the action is 'register'
    if (action === "register") {
      // Check if the email already exists in the database
      
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Validate input data
      if (!name || !email || !password || !passwordRep) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      // Additional validation for email and password
      // ...

      // Save new user to the database
      const newUser = await supabase
        .from("SHOPNAME_users")
        .insert([{ name, email, password, password_rep: passwordRep }]);

      return res
        .status(201)
        .json({ message: "Useeeer registered successfully", data: newUser });
      
     
    }

    if (action === "login") {
      // check, if frontend data matches to one of the users @supabase
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      //if theres no match send an error telling the user to check their inputs || to make a  registration
      if (!user) {
        return res.status(401).json({
          error:
            "Invalid login information. Please check your login details or make a registration",
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
    }

    return res.status(200).json({
      message: "login successful!",
    });




    }


    
}
