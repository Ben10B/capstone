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
    sun: { type: Boolean },
    mon: { type: Boolean },
    tue: { type: Boolean },
    wed: { type: Boolean },
    th: { type: Boolean },
    fri: { type: Boolean },
    sat: { type: Boolean },
  }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
