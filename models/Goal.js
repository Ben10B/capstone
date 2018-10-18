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
  daysOftheWeek: {
    sun: { type: Number },
    mon: { type: Number },
    tue: { type: Number },
    wed: { type: Number },
    th: { type: Number },
    fri: { type: Number },
    sat: { type: Number },
  },
  day: [
    {
      status: { type: String, default: "inactive" },
      date: { type: Date },
      dayOfMonth: { type: String },
    }
  ]
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
