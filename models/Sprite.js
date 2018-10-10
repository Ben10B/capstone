const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SpriteSchema = new Schema({
    gender: {
        type: Boolean,
        default: true
    },
    level: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    }
});
module.exports = Sprite = mongoose.model('sprite', SpriteSchema);