const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  maxHealth: {
    type: Number
  },
  partners: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
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
    }
  ],
  result: {
    type: String,
    default: 'Grindin'
  }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
