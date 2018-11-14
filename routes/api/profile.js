const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Sprite Model
const Sprite = require('../../models/Sprite');
// Load Goal Model
const Goal = require('../../models/Goal');
// Load Post Model
const Post = require('../../models/Post');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name'])
      .deepPopulate('friends.profile')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .deepPopulate('friends.profile')
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle/requestby/:user
// @desc    User makes friend request
// @access  Private
router.post('/handle/:handle/requestby/:userid', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  //Find requestee profile by handle
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //Find requestee sprite by handle
      Sprite.findOne({ user: profile.user }).then(sprite => {
        //Find requester; user
        Profile.findOne({ _id: req.params.userid })
        .then(user_profile => {
          user_profile.friends.unshift({ profile: profile, sprite: sprite });
          user_profile.save();
          // console.log(user_profile.friends);
        }).catch(err => res.status(404).json({ err: 'Can not find your profile' }));
      }).catch(err => res.status(404).json({ err: 'Can not find requestee sprite' }));
    })
    .catch(err => res.status(404).json({ err: 'Can not find requestee' }));
  //Find requestee profile by handle
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //Find requester sprite by handle
      Sprite.findOne({ user: req.user.id }).then(sprite => { //console.log(sprite);
        //Find requester; user
        Profile.findOne({ _id: req.params.userid })
        .then(user_profile => {
          profile.friends.unshift({ profile: user_profile, sprite: sprite, request: true });
          profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json({ err: 'Can not find your profile' }));
      }).catch(err => res.status(404).json({ err: 'Can not find your sprite' }));
    })
    .catch(err => res.status(404).json({ err: 'Can not find requestee' }));
});

// @route   GET api/profile/decline/:handle
// @desc    User declines friend request; user deletes friend
// @access  Private
router.post('/decline/:handle', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  //Find requestee by handle
  Profile.findOne({ handle: req.params.handle }).then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    }
    //Find requester; user
    Profile.findOne({ user: req.user.id })
      .then(user_profile => {
        // Delete user from requestee's friend list
        for (var i = 0; i < profile.friends.length; i++) {
          if (profile.friends[i].profile.toString() === user_profile._id.toString()) {
            // Splice out of array
            profile.friends.splice(i, 1);
          }
        }
        profile.save();
      }).catch(err => res.status(404).json({ err: 'Can not find your profile' }));
  })
  .catch(err => res.status(404).json({ err: 'Can not find requestee' }));

  //Find requestee by handle
  Profile.findOne({ handle: req.params.handle }).then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //Find requester; user
      Profile.findOne({ user: req.user.id })
        .populate('user', ['name'])
        .then(user_profile => {
          // Delete requestee from user's friend list
          for (var i = 0; i < user_profile.friends.length; i++) {
            if (user_profile.friends[i].profile.toString() === profile._id.toString()) {
              // Splice out of array
              user_profile.friends.splice(i, 1);
            }
          }
          user_profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json({ err: 'Can not find your profile' }));
  })
  .catch(err => res.status(404).json({ err: 'Can not find requestee' }));
});

// @route   GET api/profile/accept/:handle
// @desc    User accepts friend request
// @access  Private
router.post('/accept/:handle', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  //Find requestee by handle
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //Find requester; user
      Profile.findOne({ user: req.user.id })
        .then(user_profile => {
          // Accept user in requestee's friend list
          for (var i = 0; i < profile.friends.length; i++) {
            if (profile.friends[i].profile.toString() === user_profile._id.toString()) {
              profile.friends[i].request = false;
              profile.friends[i].requestAccepted = true;
            }
          }
          profile.save();
        }).catch(err => res.status(404).json({ err: 'Can not find your profile' }));
    })
    .catch(err => res.status(404).json({ err: 'Can not find requestee' }));
  //Find requestee by handle
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //Find requester; user
      Profile.findOne({ user: req.user.id })
        .populate('user', ['name'])
        .deepPopulate('friends.profile')
        .then(user_profile => {
          // Accept requestee in user's friend list
          for (var i = 0; i < user_profile.friends.length; i++) {
            if (user_profile.friends[i].profile._id.toString() === profile._id.toString()) {
              user_profile.friends[i].request = false;
              user_profile.friends[i].requestAccepted = true;
            }
          }
          // console.log(user_profile)
          user_profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json({ err: 'Can not find your profile' }));
    })
    .catch(err => res.status(404).json({ err: 'Can not find requestee' }));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name'])
    .deepPopulate('friends.profile')
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.theme) profileFields.theme = req.body.theme;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile and sprite and goals
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Goal.find({ user: req.user.id}).then(goals => {
      goals.forEach(goal => {
        // Delete
        goal.remove();
      });
    }).catch(err => res.status(404).json({ goalsnotfound: 'No goals found' }));
    Post.find({ user: req.user.id}).then(posts => {
      posts.forEach(post => {
        // Delete
        post.remove();
      });
    }).catch(err => res.status(404).json({ postsnotfound: 'No posts found' }));
    Profile.findOne({ user: req.user.id }).then(profile => {
      profile.friends.forEach(friend => {
        Profile.findOne({_id: friend.profile}).then(friend => {
          friend.friends.forEach(homie => {
            if(homie.profile.toString() === profile._id.toString()){
              homie.remove();
            }
          });
          friend.save();
        });
      });
    }).catch(err => res.status(404).json({ friendsnotfound: 'No friends found' }));
    Sprite.findOneAndRemove({ user: req.user.id }).then(() => {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    });
  }
);

module.exports = router;
