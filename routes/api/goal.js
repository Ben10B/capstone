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

    const newPost = new Goal({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
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