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
  },
  gold: {
    type: Number,
    default: 0
  },
  goalsCreated: {
    type: Number,
    default: 0
  },
  goalsCompleted: {
    type: Number,
    default: 0
  },
  achievements: [
    {
      name: {
        type: String,
      },
      acquired: {
        type: Boolean,
        default: false
      }
    }
  ],
  items: {
    hand: [
      {
        name: {
          type: String
        },
        description: {
          type: String
        },
        equipped: {
          type: Boolean,
          default: false
        },
        location: {
          type: String
        },
        src: {
          type: String
        }
      }
    ],
    head: [
      {
        name: {
          type: String
        },
        description: {
          type: String
        },
        equipped: {
          type: Boolean,
          default: false
        },
        location: {
          type: String
        },
        src: {
          type: String
        }
      }
    ],
    body: [
      {
        name: {
          type: String,
          default: 'Default'
        },
        description: {
          type: String
        },
        equipped: {
          type: Boolean,
          default: false
        },
        location: {
          type: String
        },
        src: {
          type: String
        }
      }
    ],
    accessory: [
      {
        name: {
          type: String
        },
        description: {
          type: String
        },
        equipped: {
          type: Boolean,
          default: false
        },
        location: {
          type: String
        },
        src: {
          type: String
        }
      }
    ],
  }
});
module.exports = Sprite = mongoose.model('sprite', SpriteSchema);