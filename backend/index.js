// imports
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const session = require("express-session");
const default_route = require("./routes/default_route");
const users_routes = require("./routes/users_routes");
require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// route prefix
app.use("/", default_route);
app.use("/users", users_routes);

// static pages
app.use(express.static("uploads"));

// listen port
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
