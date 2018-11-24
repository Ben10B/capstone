const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  gender: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  theme: {
    type: String,
    default: ''
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  tourFinished: {
    type: Boolean,
    default: false
  },
  social: {
    youtube: {
      type: String
    },
    linkedin: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  friends: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      },
      sprite: {
        type: Schema.Types.ObjectId,
        ref: 'sprite'
      },
      request: {
        type: Boolean,
      },
      requestAccepted: {
        type: Boolean,
      }
    }
  ]
});
ProfileSchema.plugin(deepPopulate, {
  whitelist: [
    'friends.profile',
    'friends.sprite'
  ]
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);