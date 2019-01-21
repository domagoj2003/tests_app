const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");

const User = require("../../models/Users");
const Results = require("../../models/Results");

// @route:  POST api/results/
// desc:    Add new result
// access:  PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Results.findOne()
      .then(result => {
        if (!result) {
          const newResult = {
            user: req.user.id,
            grade: req.body.grade,
            subject: req.body.subject,
            section: req.body.section,
            maxPoints: req.body.maxPoints,
            points: req.body.points
          };
          new Results({ results: newResult }).then(result =>
            res.json(result.resultlist)
          );
        } else {
          const newResult = {
            user: req.user.id,
            grade: req.body.grade,
            subject: req.body.subject,
            section: req.body.section,
            maxPoints: req.body.maxPoints,
            points: req.body.points
          };
          result.unshift(newResult);
          result.save().then(result => res.json(result));
        }
      })
      .catch(err => res.json(err));
  }
);

// @route:  GET api/results/
// desc:    Get result
// access:  PUBLIC
router.get("/", (req, res) => {
  Results.find()
    .populate("results.user", "name")
    .then(result => res.json(result));
});

module.exports = router;
