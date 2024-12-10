const express = require("express");
var cors = require("cors");

require("./db");

var app = express();

app.use(cors());
app.use(express.json()); // this is important
let allowedOrigins = ["http://localhost:3000"];

var userRouter = require("./routes/user");
var loginRouter = require("./routes/login");

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/user", userRouter);
app.use("/login", loginRouter);

module.exports = app;
