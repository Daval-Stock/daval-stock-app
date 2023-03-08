const mongoose = require("mongoose");
const URI = process.env.DB_URI;

// database connection
const promise = mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
promise.then(() => {
  console.log("Connected on the database!");
});
mongoose.set("strictQuery", false);
