const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const transactions = require("./routes/transactions");
const customers = require("./routes/customer");
const total = require("./routes/total");

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/transactions", transactions);
app.use("/api/customers", customers);
app.use("/api/total", total);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database.");
});
db.on("error", console.error.bind(console, "Mongodb connection error"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
