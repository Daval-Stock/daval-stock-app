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
require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

// cors
const cors = require('cors');

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
app.use("/products", products_routes);
//route pour produits
app.use("/products", products_routes);

//route commandes
app.use("/orders", orders_routes);

app.use(notFound);
app.use(errorHandler);
// static pages
app.use(express.static("uploads"));

// listen port
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});