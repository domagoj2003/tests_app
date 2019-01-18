const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Sedmi = require("../../models/Sedmi");
const User = require("../../models/Users");
const validateQuestionsInput = require("../../validation/questions");

// SEDMI RAZRED

//checked
// @route:  GET api/tests/sedmi/
// desc:    Get all subjects
// access:  Public
router.get("/", (req, res) => {
  Sedmi.find()
    .then(subjects => {
      const subjectList = subjects.map(item => item.subject);
      res.json(subjectList);
    })
    .catch(err => res.status(404).json(err));
});
//checked
// @route:  GET api/tests/sedmi/:subject
// desc:    Get all sections for specific subject
// access:  Public
router.get("/:subject", (req, res) => {
  Sedmi.findOne({ subject: req.params.subject })
    .then(subjects => {
      const sections = [
        ...new Set(subjects.questionset.map(item => item.section))
      ];
      res.json(sections);
    })
    .catch(err => res.json({ message: "Predmet ne postoji" }));
});
//checked
// @route:  GET api/tests/sedmi/:subject/:section
// desc:    Get questions for  specific section of subject
// access:  Private
router.get(
  "/:subject/:section",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Sedmi.findOne({ subject: req.params.subject }).then(subject => {
      const testQuestions = subject.questionset.filter(
        item => item.section === req.params.section
      );
      res.json(testQuestions);
    });
  }
);
//checked
// @route:  POST api/tests/sedmi
// desc:    Create a subject for sixth grade
// access:  Private /Admin

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Sedmi.findOne({ subject: req.body.subject }).then(subject => {
      if (subject) {
        res.json({ message: "Predmet je kreiran" });
      } else {
        const newSubject = new Sedmi({
          subject: req.body.subject
        });
        newSubject
          .save()
          .then(subject => res.json(subject.subject))
          .catch(err => res.json(err));
      }
    });
  }
);
//checked
// @route:  POST api/tests/sedmi/:subject
// desc:    Create Q&A for specific subject
// access:  Private / Admin
router.post(
  "/:subject",
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
          Sedmi.findOne({ subject: req.params.subject })
            .then(subject => {
              const newQuestion = {
                section: req.body.section,
                sort: req.body.sort,
                question: req.body.question,
                correctanswer: req.body.correctanswer,
                options: req.body.options,
                help: req.body.help,
                info: req.body.info
              };
              subject.questionset.unshift(newQuestion);
              subject
                .save()
                .then(subject => res.json(subject.questionset))
                .catch(err => res.json(errors));
            })
            .catch(err => res.json({ message: "Predmet ne postoji" }));
        }
      });
    }
  }
);

// @route:  POST api/tests/sedmi/:subject/:question_id
// desc:    edit question
// access:  Private / Admin
router.post(
  "/:subject/:question_id",
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
          Sedmi.findOne({ subject: req.params.subject })
            .then(subject => {
              const questionEdit = subject.questionset.find(
                item => item._id.toString() === req.params.question_id
              );
              if (!questionEdit) {
                errors.noquestion = "Ne postoji traženo pitanje";
                res.status(400).json(errors);
              } else {
                questionEdit.question = req.body.question;
                questionEdit.sort = req.body.sort;
                questionEdit.correctanswer = req.body.correctanswer;
                questionEdit.options = req.body.options;
                questionEdit.help = req.body.help;
                questionEdit.info = req.body.info;
                subject
                  .save()
                  .then(subject => res.json(subject.questionset))
                  .catch(err => res.json(errors));
              }
            })
            .catch(err => res.json({ message: "Predmet ne postoji" }));
        }
      });
    }
  }
);

//checked
// @route:  DELETE api/tests/sedmi/:subject/:question_id
// desc:    Delete a question
// access:  Private / Admin
router.delete(
  "/:subject/:question_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (!user.admin) {
        res.status(400).json({ message: "Nemaš administratorski pristup" });
      } else {
        Sedmi.findOne({ subject: req.params.subject })
          .then(subject => {
            const removeIndex = subject.questionset
              .map(item => item._id.toString())
              .indexOf(req.params.question_id);
            subject.questionset.splice(removeIndex, 1);
            subject.save().then(subject => res.json(subject.questionset));
          })
          .catch(err => res.json({ message: "Predmet nije pronađen" }));
      }
    });
  }
);

module.exports = router;
