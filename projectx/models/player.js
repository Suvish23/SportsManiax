const mongoose = require('mongoose');
const slugify = require('slugify');

const PlayerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'name cannot be more than 50 characters'],
  },
  Born: {
    type: String,
    trim: true,
    required: true,
  },
  Birthplace: {
    type: String,
    trim: true,
    required: true,
  },
  Nickname: {
    type: String,
    trim: true,
  },
  Height: {
    type: String,
    trim: true,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Battingstyle: {
    type: String,
    trim: true,
    required: true,
  },
  Bowlingstyle: {
    type: String,
    trim: true,
    required: true,
  },
  Batting: {
    Matches: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Innings: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Runs: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Balls: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Highest: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Average: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    SR: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Notout: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Fours: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Sixes: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Ducks: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    _50s: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    _100s: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    _200s: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
  },
  Bowling: {
    Matches: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Innings: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Runs: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Balls: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Maidens: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Avg: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Wickets: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    Eco: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    SR: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    BBI: {
      Test: {
        type: String,
        required: true,
      },
      ODI: {
        type: String,
        required: true,
      },
      T20: {
        type: String,
        required: true,
      },
      IPL: {
        type: String,
        required: true,
      },
    },
    BBM: {
      Test: {
        type: String,
        required: true,
      },
      ODI: {
        type: String,
        required: true,
      },
      T20: {
        type: String,
        required: true,
      },
      IPL: {
        type: String,
        required: true,
      },
    },
    _4w: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    _5w: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
    _10w: {
      Test: {
        type: Number,
        required: true,
      },
      ODI: {
        type: Number,
        required: true,
      },
      T20: {
        type: Number,
        required: true,
      },
      IPL: {
        type: Number,
        required: true,
      },
    },
  },
  Career: {
    TEST: {
      Debut: String,
      Lastplayed: String,
    },
    ODI: {
      Debut: String,
      Lastplayed: String,
    },
    T20: {
      Debut: String,
      Lastplayed: String,
    },
    IPL: {
      Debut: String,
      Lastplayed: String,
    },
  },
  Photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  FavouritePlayer: {
    type: String,
    required: [true, 'Pleases type your Favourite Player'],
    maxlength: [500, 'description cannot be more than 500 characters'],
    trim: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'please add a valid email',
    ],
  },
  slug: String,
  Country: String,
  City: String,
  Profession: {
    type: [String],
    enum: [],
  },
  FavouriteSport: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('player', PlayerSchema);
