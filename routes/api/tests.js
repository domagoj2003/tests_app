const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Sixthgrade = require("../../models/Sixthgrade");
const User = require("../../models/Users");
const validateQuestionsInput = require("../../validation/questions");

// ŠESTI RAZRED

// @route:  GET api/tests/sixth/:subject
// desc:    Get all sections for specific subject
// access:  Public
router.get("/sixth/:subject", (req, res) => {
  Sixthgrade.findOne({ subject: req.params.subject })
    .then(subjects => {
      const sections = [
        ...new Set(subjects.questionset.map(item => item.section))
      ];
      res.json(sections);
    })
    .catch(err => res.json({ message: "Predmet ne postoji" }));
});

// @route:  GET api/tests/sixth/:subject/:section
// desc:    Get questions for  specific section of subject
// access:  Private
router.get(
  "/sixth/:subject/:section",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Sixthgrade.findOne({ subject: req.params.subject }).then(subject => {
      const testQuestions = subject.questionset.filter(
        item => item.section === req.params.section
      );
      res.json(testQuestions);
    });
  }
);

// @route:  POST api/tests/sixth
// desc:    Create a subject for sixth grade
// access:  Private /Admin

router.post(
  "/sixth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Sixthgrade.findOne({ subject: req.body.subject }).then(sub => {
      if (sub) {
        res.json({ message: "Predmet već postoji u bazi podataka" });
      } else {
        const newSubject = new Sixthgrade({
          subject: req.body.subject
        });
        newSubject
          .save()
          .then(subject => res.json(subject))
          .catch(err => res.json(err));
      }
    });
  }
);

// @route:  POST api/tests/sixth/:subject
// desc:    Create Q&A for specific subject
// access:  Private / Admin
router.post(
  "/sixth/:subject",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionsInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      User.findById(req.user.id).then(user => {
        if (!user.admin) {
          errors.admin = "Nemaš administratorski pristup";
          res.status(400).json(errors);
        } else {
          Sixthgrade.findOne({ subject: req.params.subject })
            .then(subject => {
              const newQuestion = {
                section: req.body.section,
                question: req.body.question,
                correctanswer: req.body.correctanswer,
                help: req.body.help
              };
              subject.questionset.unshift(newQuestion);
              subject
                .save()
                .then(subject => res.json(subject))
                .catch(err => res.json(err));
            })
            .catch(err => res.json({ message: "Predmet ne postoji" }));
        }
      });
    }
  }
);

// @route:  DELETE api/tests/sixth/:subject/:question_id
// desc:    Delete a question
// access:  Private / Admin
router.delete(
  "/sixth/:subject/:question_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (!user.admin) {
        res.status(400).json({ message: "Nemaš administratorski pristup" });
      } else {
        Sixthgrade.findOne({ subject: req.params.subject })
          .then(subject => {
            const removeIndex = subject.questionset
              .map(item => item._id.toString())
              .indexOf(req.params.question_id);
            subject.questionset.splice(removeIndex, 1);
            subject.save().then(subject => res.json(subject));
          })
          .catch(err => res.json({ message: "Predmet nije pronađen" }));
      }
    });
  }
);

module.exports = router;
