const nodemailer = require("nodemailer");
const Product = require("./models/products")
const user = require("./models/users")

// Configurez votre service de messagerie ici
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daval.stock@gmail.com",
    pass: "rogghvozsdeyzmsb",
  },
});

async function sendEmailNotification(email, message) {
  const mailOptions = {
    from: "daval.stock@gmail.com",
    to: email,
    subject: "Test Email",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
}


const testRecipientEmail = user.email;
const testMessage = "user.email";

sendEmailNotification(testRecipientEmail, testMessage);
 
