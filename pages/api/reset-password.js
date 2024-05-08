
import { supabase } from "@/services/supabaseClient";
import { randomBytes } from "crypto-browserify";


import { mailOptions, transporter } from "../../config/mailerConfig";



export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;



    try {
      // Check whether the e-mail address exists in the Supabase table
      const { data, error } = await supabase
        .from("SHOPNAME_users")
        .select("*")
        .eq("email", email);

      if (error) {
        console.error("Error fetching user:", error.message);
        return res.status(500).json({ error: "Error fetching user" });
      }

      if (data.length === 0) {
        return res.status(404).json({
          error:
            "The e-mail address you entered does not appear to be registered. Please feel free to register",
        });
      }

      // generate a new random password
      const newPassword = randomBytes(4).toString("hex");

      // Update the user's password in the database
      const { updateData, updateError } = await supabase
        .from("SHOPNAME_users")
        .update({ password: newPassword })
        .eq("email", email);

      if (updateError) {
        console.error("Error updating password:", updateError.message);
        return res.status(500).json({ error: "Error updating the password" });
      }

      console.log("Password successfully updated for e-mail:", email);

      // Sende das neue Passwort per E-Mail an den Benutzer
      // .to and .text are to be declared variably
      mailOptions.to = email;
      mailOptions.text = `Dein neues Passwort lautet: ${newPassword}`;

      try {
        await transporter.sendMail({
          ...mailOptions,
          subject:
            "test subject" /* data.subject (gibts in meinem objekt nicht) */,
          text: mailOptions.text,
          html: `<h1>Your new password incoming ... 🚀 </h1> <p>Dein neues Passwort lautet: ${newPassword}</p>`,
        });

        return res.status(200).json({
          success: true,
          message:
            "New password has been successfully set and sent to your e-mail",
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      return res.status(500).json({ error: "Error resetting the password" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
