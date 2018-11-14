const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

// Create Schema
const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  health: {
    type: Number
  },
  reward: {
    type: String
  },
  punishment: {
    type: String
  },
  maxHealth: {
    type: Number
  },
  partners: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      },
      sprite: {
        type: Schema.Types.ObjectId,
        ref: 'sprite'
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  days: [
    {
      status: { type: String, default: "inactive" },
      year: { type: String },
      month: { type: String },
      dayOfMonth: { type: String },
      date: { type: Date },
      details: { type: String },
    }
  ],
  result: {
    type: String,
    default: 'Grindin'
  },
  friendlyFire: {
    type: Boolean,
    default: false
  }
});
GoalSchema.plugin(deepPopulate, {
  whitelist: [
    'partners.profile',
    'partners.sprite',
  ]
});
module.exports = Goal = mongoose.model('goal', GoalSchema);
