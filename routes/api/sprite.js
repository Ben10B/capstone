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
    //   .then(sprite => res.json(sprite))
      .then(sprite => {res.json({
          gender: "Female",
          level: 0,
          experience: 0
      })})
      .catch(err => res.status(404).json({ nopostsfound: 'No sprites found' }));
});

// @route   GET api/sprite/:id
// @desc    Get sprite by id
// @access  Public
router.get('/:id', (req, res) => {
    Sprite.findById(req.params.id)
      .then(sprite => res.json(sprite))
      .catch(err =>
        res.status(404).json({ nospritefound: 'No sprite found with that ID' })
      );
});
module.exports = router;