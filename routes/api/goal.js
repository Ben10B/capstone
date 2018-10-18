const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Goal model
const Goal = require('../../models/Goal');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateGoalInput = require('../../validation/goal');

// @route   GET api/goal/test
// @desc    Tests goal route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Goal Works' }));

// @route   GET api/goal
// @desc    Get goal
// @access  Public
router.get('/', (req, res) => {
  Goal.find()
    .then(goals => res.json(goals))
    .catch(err => res.status(404).json({ nogoalsfound: 'No goals found' }));
});

// @route   GET api/goal/:id
// @desc    Get goal by id
// @access  Public
router.get('/:id', (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => res.json(goal))
    .catch(err =>
      res.status(404).json({ nogoalfound: 'No goal found with that ID' })
    );
});

// @route   GET api/goal/user/:user_id
// @desc    Get goals by user
// @access  Public
router.get('/user/:user_id', (req, res) => {
  Goal.find({user: req.params.user_id})
    // .then(goal => console.log(json(goal))
    .then(goal => res.json(goal)
    )
    .catch(err =>
      res.status(404).json({ nogoalsfound: 'No goals found by that user' })
    );
});

// @route   POST api/goal
// @desc    Create goal
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGoalInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Days
    daysObj = {};
    daysObj.sun = req.body.sun;
    daysObj.mon = req.body.mon;
    daysObj.tue = req.body.tue;
    daysObj.wed = req.body.wed;
    daysObj.th = req.body.th;
    daysObj.fri = req.body.fri;
    daysObj.sat = req.body.sat;

    const newGoal = new Goal({
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      date: req.body.date,
      health: 10,
      maxHealth: 10,
      partners: req.body.partners,
      user: req.user.id,
      daysOftheWeek: daysObj
    });

    newGoal.save().then(goal => res.json(goal));
  }
);

// @route   DELETE api/goal/:id
// @desc    Delete goal
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Goal.findById(req.params.id)
        .then(goal => {
          // Check for goal owner
          if (goal.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          goal.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ goalnotfound: 'No goal found' }));
    });
  }
);
module.exports = router;