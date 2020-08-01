const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load env vars

dotenv.config({ path: './config/config.env' });

// load models
const Profile = require('./models/Profile');
const User = require('./models/User');

//connect DB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read Json files

const Fanprofiles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/profiles.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Profile.create(Fanprofiles);
    await User.create(users);
    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
//Delete data
const deleteData = async () => {
  try {
    await Profile.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
