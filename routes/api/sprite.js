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
      .catch(err => res.status(404).json({ nospritefound: 'No sprites found' }));
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
    experienceLimit: 10,
    achievements: req.body.achievements
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

// @route   POST api/sprite/update/:id
// @desc    Update sprite
// @access  Public
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Sprite.findById(req.params.id)
    .then(sprite => {
      if(sprite){
        Sprite.findOneAndUpdate(
          { user: req.user.id },
          { $set: req.body },
          { new: true },
        ).then(sprite => res.json(sprite));
      }
    })
    .catch(err =>
      res.status(404).json({ nospritefound: 'No sprite found with that ID' })
    );
});

// @route   POST api/sprite/eqItem
// @desc    Update sprite's weapon/item
// @access  Public
router.post('/eqItem', passport.authenticate('jwt', { session: false }), (req, res) => {
  let part = req.body.part;
  let name = req.body.name;
  let equipped = req.body.eq;

  Sprite.findOne({user: req.user.id})
    .then(sprite => {
      if(sprite){
        if(part === 'Hand'){
          sprite.items.hand.forEach(item => {
            if(item.name === name) item.equipped = equipped;
            else item.equipped = false;
          });
        }
        if(part === 'Head'){
          sprite.items.head.forEach(item => {
            if(item.name === name) item.equipped = equipped;
            else item.equipped = false;
          });
        }
        if(part === 'Body'){
          sprite.items.body.forEach(item => {
            if(item.name === name) item.equipped = equipped;
            else item.equipped = false;
          });
        }
        if(part === 'Accessory'){
          sprite.items.accessory.forEach(item => {
            if(item.name === name) item.equipped = equipped;
            else item.equipped = false;
          });
        }
        sprite.save().then(sprite => res.json(sprite));
      }
    })
    .catch(err =>
      res.status(404).json({ nospritefound: 'No sprite found' })
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