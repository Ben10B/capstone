const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AchievementsSchema = new Schema({
  name: {
    type: String,
  },
  img: { 
    data: Buffer, 
    contentType: String 
  },
  location: {
    type: String
  },
  acquired: {
    type: Boolean,
    default: false
  }

});
module.exports = Sprite = mongoose.model('rewards', AchievementsSchema);