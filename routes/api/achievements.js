const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');

// Load Achievements Model
const Achievements = require('../../models/Achievements');

// @route   GET api/rewards/test
// @desc    Tests achievements route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Achievements Works' }));

// @route   GET api/rewards
// @desc    Get achievements
// @access  Public
router.get('/', (req, res) => {
  Achievements.find()
      .then(rewards => res.json(rewards))
      .catch(err => res.status(404).json({ norewardsfound: 'No achievements found' }));
});

// @route   Post api/rewards/new
// @desc    Create reward; don't forget to change to get method
// @access  Private
router.get('/new', (req, res) => {
  var img = {};
  // img.data = fs.readFileSync(`~/../client/src/Assets/img/Grindin.png`);
  // img.contentType = `image/png`;
  const reward = {
    // img: img,
    "name": "Partner Up!",
    "location": "/static/media/Twin%20Swords.21cabe00.svg",
  }
  new Achievements(reward).save().then(reward => res.json(reward));
});



module.exports = router;