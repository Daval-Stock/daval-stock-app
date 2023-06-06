// imports
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const session = require("express-session");
const default_route = require("./routes/default_route");
const users_routes = require("./routes/users_routes");
const products_routes = require("./routes/products_routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const orders_routes = require("./routes/orders_routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const multer = require("multer");
require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const categoryRoutes = require("./routes/category_routes");
const siteRoutes = require("./routes/sites_routes");
const saleRoutes= require("./routes/sales_routes");
const UserInventoryRoutes = require("./routes/UserInventory_route");
const transactionRoutes = require("./routes/transactions_routes");

// cors
const cors = require("cors");

//Importer pour exécuter le fichier d'envoie du mail d'alerte aux fournisseurs
require("./utils/productAlerts");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

// Use this after the variable declaration
app.use(cors());

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// route prefix
app.use("/", default_route);
app.use("/users", users_routes);

//route pour produits
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/products", products_routes);

//route pour les catégories
app.use("/categories", categoryRoutes);

//route pour les sites
app.use("/sites", siteRoutes);

//route commandes
app.use("/orders", orders_routes);

//route ventes;
app.use("/sales", saleRoutes);

//route inventaire;
app.use("/userInventory", UserInventoryRoutes);

//route transactions;
app.use("/transactions", transactionRoutes);

app.use(notFound);
app.use(errorHandler);

// static pages
app.use(express.static("uploads"));

// listen port
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
