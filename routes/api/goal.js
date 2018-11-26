const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');

// Goal model
const Goal = require('../../models/Goal');
// Profile model
const Profile = require('../../models/Profile');
// Sprite model
const Sprite = require('../../models/Sprite');

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
    .deepPopulate('partners.profile partners.sprite')
    .then(goals => res.json(goals))
    .catch(err => res.status(404).json({ nogoalsfound: 'No goals found' }));
});

// @route   GET api/goal/:id
// @desc    Get goal by id
// @access  Public
router.get('/:id', (req, res) => {
  Goal.findById(req.params.id)
    .deepPopulate('partners.profile partners.sprite')
    .then(goal => res.json(goal))
    .catch(err =>
      res.status(404).json({ nogoalfound: 'No goal found with that ID' })
    );
});

// @route   GET api/goal/user/:user_id
// @desc    Get goals by user
// @access  Public
router.get('/user/:user_id', (req, res) => {
  Profile.find({ user: req.params.user_id}).then(profile => {
    Goal.find({ user: req.params.user_id, result: 'Grindin' })
    .deepPopulate('partners.profile partners.sprite').sort({ date: 1 })
    .then(goals => {
      Goal.find({ partners: { $elemMatch: { profile: profile}} })
      .deepPopulate('partners.profile partners.sprite').sort({ date: 1 })
      .then(friendGoals => {
        if(friendGoals.length !== 0){ 
          let allGoals = goals.concat(friendGoals);
          res.json(allGoals);
        } else res.json(goals);
      }).catch(err => res.status(404).json({ nofriendgoalsfound: 'No friend goals found by this user' }));
    }).catch(err => res.status(404).json({ nogoalsfound: 'No goals found by this user' }));
  }).catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route   GET api/goal/user/:user_id
// @desc    Get completed goals by user
// @access  Public
router.get('/user/:user_id/completed', (req, res) => {
  Profile.find({ user: req.params.user_id}).then(profile => {
    Goal.find({ user: req.params.user_id, result: 'COMPLETE' })
    .deepPopulate('partners.profile partners.sprite').sort({ date: 1 })
    .then(goals => {
      Goal.find({ partners: { $elemMatch: { profile: profile}} })
      .deepPopulate('partners.profile partners.sprite').sort({ date: 1 })
      .then(friendGoals => {
        if(friendGoals.length !== 0){ 
          let allGoals = goals.concat(friendGoals);
          res.json(allGoals);
        } else res.json(goals);
      }).catch(err => res.status(404).json({ nofriendgoalsfound: 'No friend goals found by this user' }));
    }).catch(err => res.status(404).json({ nogoalsfound: 'No goals found by this user' }));
  }).catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route   GET api/goal/user/:user_id
// @desc    Get incompleted goals by user
// @access  Public
router.get('/user/:user_id/incompleted', (req, res) => {
  Profile.find({ user: req.params.user_id}).then(profile => {
    Goal.find({ user: req.params.user_id, result: 'INCOMPLETE' })
    .deepPopulate('partners.profile partners.sprite').sort({ date: 1 })
    .then(goals => {
      Goal.find({ partners: { $elemMatch: { profile: profile}} })
      .deepPopulate('partners.profile partners.sprite').sort({ date: 1 })
      .then(friendGoals => {
        if(friendGoals.length !== 0){ 
          let allGoals = goals.concat(friendGoals);
          res.json(allGoals);
        } else res.json(goals);
      }).catch(err => res.status(404).json({ nofriendgoalsfound: 'No friend goals found by this user' }));
    }).catch(err => res.status(404).json({ nogoalsfound: 'No goals found by this user' }));
  }).catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route   POST api/goal
// @desc    Create goal
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGoalInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const recruits = req.body.partners;
    const partners = [];

    if(recruits.length > 0){
      recruits.forEach(recruit => {
        Profile.findOne({ _id: recruit.id }).then(profile => {
          Sprite.findOne({ user: profile.user }).then(sprite => {
            partners.push({profile: profile, sprite: sprite});

            if(recruit.name === recruits[recruits.length-1].name){
              const newGoal = new Goal({
              title: req.body.title,
              description: req.body.description,
              difficulty: req.body.difficulty,
              reward: req.body.reward,
              punishment: req.body.punishment,
              date: req.body.date,
              partners: partners,
              user: req.user.id,
              health: req.body.maxHealth,
              maxHealth: req.body.maxHealth,
              days: req.body.days,
              date: req.body.date,
              item: req.body.date,
              friendlyFire: req.body.friendlyFire,
              result: 'Grindin'
            });
            newGoal.save().then(goal => res.json(goal));
            }
          });
        });
      });
    } else {
      const newGoal = new Goal({
        title: req.body.title,
        description: req.body.description,
        difficulty: req.body.difficulty,
        reward: req.body.reward,
        punishment: req.body.punishment,
        date: req.body.date,
        partners: partners,
        user: req.user.id,
        health: req.body.maxHealth,
        maxHealth: req.body.maxHealth,
        days: req.body.days,
        date: req.body.date,
        item: req.body.date,
        friendlyFire: req.body.friendlyFire,
        result: 'Grindin'
      });
      newGoal.save().then(goal => res.json(goal));
    }
  }
);

// @route   POST api/goal/check
// @desc    Check goal for validation
// @access  Private
router.post( '/check', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGoalInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    } else return res.json({isValid: true});
  }
);

// @route   POST api/goal/update
// @desc    Update goal
// @access  Private
router.post('/update/:id', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Goal.updateOne(
    { _id: req.params.id },
    { 
      title: req.body.title,
      result: req.body.result,
      description: req.body.description,
      reward: req.body.reward,
      punishment: req.body.punishment,
      difficulty: req.body.difficulty,
      date: req.body.date,
      partners: req.body.partners,
      health: req.body.health,
      maxHealth: req.body.maxHealth,
      days: req.body.days,
    }
  ).then(goal => res.json(goal))
  .catch(err => res.status(404).json({ goalnotfound: 'No goal found' }));
});

// @route   DELETE api/goal/:id
// @desc    Delete goal
// @access  Private
router.delete('/:id',
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

// @route   POST api/goal/:handle/:user
// @desc    Remove friends from collaborative goals
// @access  Private
router.post('/remove/:handle/:user',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ handle: req.params.handle }).then(profile => {
      Goal.find({ user: req.user.id, result: 'Grindin', $where: 'this.partners.length>0' }).then(goals => {
        goals.forEach(goal => {
          goal.partners.forEach(partner => {
            if(partner.profile.toString() === profile._id.toString()){
              partner.remove();
            }goal.save();
          });
        });
      }).catch(err => res.status(404).json({ err: 'No goals together' }));
    });
    Profile.findOne({ user: req.user.id }).then(profile => {
      Goal.find({ user: req.params.user, result: 'Grindin', $where: 'this.partners.length>0' }).then(goals => {
        goals.forEach(goal => {
          goal.partners.forEach(partner => {
            if(partner.profile.toString() === profile._id.toString()){
              partner.remove();
            }goal.save();
          });
        });
      }).catch(err => res.status(404).json({ err: 'No goals together' }));
    });
  }
);
module.exports = router;