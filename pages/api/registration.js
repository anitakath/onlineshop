import { createClient } from '@supabase/supabase-js';

import { supabase } from '@/services/supabaseClient';


function escape(input) {
  // Ersetze alle < und > Zeichen durch ihre HTML-Entities
  input = input.replace(/</g, "&lt;");
  input = input.replace(/>/g, "&gt;");
  // Weitere Bereinigungen oder Ersetzungen können hier hinzugefügt werden
  return input;
}



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  //receive the input values from the frontend
  const { name, email, password, password_rep } = req.body;

  // Check whether all required fields are filled in
  if (!name || !email || !password || !password_rep) {
    return res.status(400).json({ error: "Please fill in all input fields" });
  }

  // validate those inputs
  const trimEmail = email.trim();
  const trimPassword = password.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx for e-mail adresses

  if (!trimEmail || !emailRegex.test(trimEmail)) {
    return res.status(400).json({ error: "Invalid e-mail" });
  }

  if (!trimPassword || trimPassword.length < 6 || trimPassword.length > 14) {
    return res.status(400).json({
      error: "Invalid password.It should be between 6 and 14 letters/numbers",
    });
  }

  // Check whether the e-mail already exists in the database
  const { data: existingUser, error: userError } = await supabase
    .from("SHOPNAME_users")
    .select("*")
    .eq("email", trimEmail);

  if (userError) {
    return res.status(500).json({ error: "Internal Server Error" });
  }


  //error it if the user already exists.
  if (existingUser && existingUser.length > 0) {
    return res.status(409).json({ error: "User already exists" });
  }


  // add the user to the supabase table if it does not yet exist
  const { data, error } = await supabase.from("SHOPNAME_users").insert([
    {
      name: name,
      email: email,
      password: password,
      password_rep: password_rep,
    },
  ]);

  return res.status(200).json({ message: "Registration successful" });
}