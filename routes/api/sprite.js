const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Sprite Model
const Sprite = require('../../models/Sprite');
// Load User Model
const User = require('../../models/User');

// @route   GET api/sprite/test
// @desc    Tests sprite route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Sprite Works' }));

// @route   GET api/sprite
// @desc    Get sprite
// @access  Public
router.get('/', (req, res) => {
    Sprite.find()
      .then(sprite => res.json(sprite))
      .catch(err => res.status(404).json({ nopostsfound: 'No sprites found' }));
});

// @route   Post api/sprite
// @desc    Create sprite
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newSprite = new Sprite({ 
    user: req.user.id, 
    gender: req.body.gender,
    level: 1, 
    experience: 0, 
    experienceLimit: 10 
  });
  newSprite.save().then(newSprite => res.json(newSprite));
});

// @route   GET api/sprite/:user_id
// @desc    Get sprite by user
// @access  Public
router.get('/user/:user_id', (req, res) => {
    Sprite.findOne({user: req.params.user_id})
      .then(sprite => res.json(sprite))
      .catch(err =>
        res.status(404).json({ nospritefound: 'No sprite found with that ID' })
      );
});

// @route   PUT api/sprite/:id/complete
// @desc    Increase experience
// @access  Public
router.put('/:id', (req, res) => {
  Sprite.findById(req.params.id)
    .then(sprite => res.json(sprite))
    .catch(err =>
      res.status(404).json({ nospritefound: 'No sprite found with that ID' })
    );
});

// @route   DELETE api/sprite/:id
// @desc    Delete sprite
// @access  Private
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Sprite.findById(req.params.id)
        .then(sprite => {
          // Check for sprite owner
          if (sprite.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          sprite.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ spritenotfound: 'No sprite found' }));
    });
  }
);

module.exports = router;