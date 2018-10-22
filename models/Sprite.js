const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SpriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    gender: {
        type: String,
    },
    level: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    },
    experienceLimit: {
        type: Number,
        default: 0
    }
});
module.exports = Sprite = mongoose.model('sprite', SpriteSchema);