const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// DB models import
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const results = require("./routes/api/results");
const testsFifth = require("./routes/api/testsFifth");
const testsSixth = require("./routes/api/testsSixth");
const testsSeventh = require("./routes/api/testsSeventh");
const testsEight = require("./routes/api/testsEight");

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
app.use("/api/profile", profile);
app.use("/api/results", results);
app.use("/api/tests/peti", testsFifth);
app.use("/api/tests/sesti", testsSixth);
app.use("/api/tests/sedmi", testsSeventh);
app.use("/api/tests/osmi", testsEight);

app.get("/", (req, res) => {
  res.send("test_knowledge_app");
});

const port = process.env.PORT || 500;
app.listen(port, () => console.log(`Server is running on port ${port}`));
