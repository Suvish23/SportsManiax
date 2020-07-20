const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'name cannot be more than 50 characters'],
  },
  Photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  FavoritePlayer: {
    type: String,
    required: [true, 'Pleases type your Favourite Player'],
    maxlength: [500, 'description cannot be more than 500 characters'],
    trim: true,
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'please add a valid email',
    ],
  },
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

module.exports = mongoose.model('Profile', ProfileSchema);
