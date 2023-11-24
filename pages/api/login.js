const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});




export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    console.log("Request received");

    console.log(req.body);

    // Überprüfen der E-Mail mit RegEx
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Ungültige E-Mail" });
    }

    // Überprüfen des Passworts
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Ungültiges Passwort" });
    }

    
    // Speichere bereits registrierte Benutzer
    const registeredUsers = [
      { email: "anne@web.de", password: "aaaaaa1" },
      { email: "user@example.com", password: "password456"},
    ];

    // Überprüfe, ob E-Mail in der Liste der registrierten Benutzer vorhanden ist
    const user = registeredUsers.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Überprüfe, ob das eingegebene Passwort mit dem gespeicherten Passwort übereinstimmt
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful" });
  }
}





