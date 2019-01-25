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
            maxpoints: req.body.maxPoints,
            points: req.body.points,
            percentage: req.body.percentage
          };
          new Results({ resultlist: new Array(newResult) })
            .save()
            .then(result => res.json(result.resultlist));
        } else {
          const newResult = {
            user: req.user.id,
            grade: req.body.grade,
            subject: req.body.subject,
            section: req.body.section,
            maxpoints: req.body.maxPoints,
            points: req.body.points,
            percentage: req.body.percentage
          };
          result.resultlist.unshift(newResult);
          result.save().then(result => res.json(result.resultlist));
        }
      })
      .catch(err => res.json(err));
  }
);

// @route:  GET api/results/
// desc:    Get result
// access:  PUBLIC
router.get("/", (req, res) => {
  Results.findOne()
    .populate("resultlist.user", "name")
    .then(result => res.json(result.resultlist));
});

// @route:  DELETE api/results/:result_id
// desc:    delete result
// access:  Private

router.delete(
  "/:result_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Results.findOne().then(results => {
      const removeIndex = results.resultlist
        .map(item => item._id.toString())
        .indexOf(req.params.result_id);
      results.resultlist.splice(removeIndex, 1);
      results.save().then(results => res.json(results));
    });
  }
);

module.exports = router;
