//import nodemailer from 'nodemailer'

const mail = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;



const nodemailer = require("nodemailer");

// Konfiguration des Transporters für Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail,
    pass: pass, 
  },
});

// Generate a random password

// E-Mail-Inhalt
const mailOptions = {
  from: "annekathrinwagner1996@gmail.com",
  to: "", // dynamically geneated
  subject: "Your new password incoming ... ",
  text: "hihihihi", // text to appear in the users email body
};

// Sende die E-Mail
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("E-Mail gesendet: " + info.response);
  }
});


export { mailOptions, transporter };

