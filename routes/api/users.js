const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// Input validation
const validateRegistryInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/Users");
// Test route
router.get("/test", (req, res) => res.json({ message: "user routes ok." }));

// @route:  POST api/users/register
// desc:    Register new user
// access:  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistryInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ name: req.body.name }).then(user => {
      if (user) {
        errors.name = "Korisničko ime je zauzeto. Odaberi drugo";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
          admin: req.body.admin
        });
        // password ecryption
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// @route:  POST api/users/login
// desc:    Login existing user
// access:  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const password = req.body.password;
    const name = req.body.name;

    // Find user by name
    User.findOne({ name }).then(user => {
      if (!user) {
        errors.name = "Korisničko ime ne postoji";
        res.status(404).json(errors);
      } else {
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // if user match creating payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            // token sign
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 7200 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Zaporka nije ispravna. Probaj ponovo.";
            res.status(400).json(errors);
          }
        });
      }
    });
  }
});

module.exports = router;
