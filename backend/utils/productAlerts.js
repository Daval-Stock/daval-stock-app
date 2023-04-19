const Product = require("../models/products");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

// Configurez votre service de messagerie ici
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daval.stock@gmail.com",
    pass: "rogghvozsdeyzmsb",
  },
});

const sendEmailNotification = async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: "daval.stock@gmail.com",
    to: email,
    subject: "Alerte de seuil minimum de produit",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
    res.status(200).json({ success: true, message: `Email sent to ${email}` });
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};


const checkProductThreshold = async (req, res) => {
  try {
    const products = await Product.find().populate("supplier");
    const threshold = 10;

    for (const product of products) {
      if (product.quantity <= threshold) {
        const supplier = await User.findById(product.supplier);

        if (supplier) {
          const message = `Le produit ${product.name} (SKU: ${product.sku}) a atteint le seuil minimum de ${threshold}. Veuillez réapprovisionner le stock.`;

          await sendEmailNotification({ email: supplier.email, message });
        }
      }
    }
    res.status(200).json({ success: true, message: "Product threshold check completed." });
  } catch (error) {
    console.error(`Failed to check product threshold: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to check product threshold." });
  }
};


module.exports={
    sendEmailNotification, checkProductThreshold
}

// Planifiez la tâche pour vérifier le seuil de produit toutes les heures (vous pouvez ajuster la fréquence selon vos besoins)
cron.schedule("0 * * * *", checkProductThreshold);

