const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");

const User = require("../../models/Users");
const Profile = require("../../models/Profile");

// @route:  POST api/profile/
// desc:    Create/Edit User Profile
// access:  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const profileData = {};
      profileData.user = req.user.id;
      profileData.school = req.body.school;
      profileData.city = req.body.city;
      profileData.grade = req.body.grade;
      if (req.body.bio) profileData.bio = req.body.bio;

      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileData },
              { new: true }
            )
              .then(profile => res.json(profile))
              .catch(err => res.json(err));
          } else {
            new Profile(profileData).save().then(profile => res.json(profile));
          }
        })
        .catch(err => res.json(err));
    }
  }
);

// @route:  GET api/profile/
// desc:    retrieve current profile
// access:  PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profil ne postoji";
          return res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route:  GET api/profile/:user_id
// desc:    retrieve user profile
// access:  PUBLIC

router.get("/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", "name")
    .then(profile => {
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route:  POST api/profile/result
// desc:    Save test results in profile array
// access:  PRIVATE
router.post(
  "/result",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newResult = {
          grade: req.body.grade,
          subject: req.body.subject,
          section: req.body.section,
          maxpoints: req.body.maxPoints,
          points: req.body.points
        };
        profile.results.unshift(newResult);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
