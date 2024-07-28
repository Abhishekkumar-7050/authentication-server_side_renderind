const express = require("express");
const { connectToMongoDB } = require("./connection.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const bodyParser = require("body-parser");

const { restrictToLoggedinUserOnly,checkAuth } = require("./middeleware/auth.js");

const app = express();

// for server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = 8000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
require("dotenv").config();
bodyParser.json();

// database connections
connectToMongoDB(process.env.MONGO_URI).then(() =>
  console.log("Mongodb connected ")
);

// routes
app.use("/user", authRouter);

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/login", checkAuth, (req, res) => {
  return res.render("login");
});
app.get("/", restrictToLoggedinUserOnly, (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
