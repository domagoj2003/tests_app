const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// DB models import
const users = require("./routes/api/users");
const tests = require("./routes/api/tests");

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database configuration
const db = require("./config/keys").mongoURI;

// MongoDB connection
mongoose
  .connect(db)
  .then(() => console.log("Mongo Database connected"))
  .catch(err => console.log(err));

// passport middleware init
app.use(passport.initialize());

// jwt auth config
require("./config/passport_jwt")(passport);

// Routes set-up config
app.use("/api/users", users);
app.use("/api/tests", tests);

app.get("/", (req, res) => {
  res.send("test_knowledge_app");
});

const port = process.env.PORT || 500;
app.listen(port, () => console.log(`Server is running on port ${port}`));
