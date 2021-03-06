const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// var morgan = require('morgan');
const errorHandler = require('./middelware/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();
//route files
const Boot = require('./router/Player');
const Bootcamps = require('./router/Fan');
const auth = require('./router/auth');
//load env vars

const app = express();
//body parser
//this is used to send data to from postman... to server
app.use(express.json());
//cookie parser

app.use(cookieParser());
//Dev logging middelware
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
//File uploading
app.use(fileupload());
//Mount routers
app.use('/api/v1/Player', Boot);
app.use('/api/v1/Fan', Bootcamps);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server runinng in ${process.env.NODE_ENV} node on port ${PORT}`.yellow
      .italic
  )
);

//handel unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}.red`);

  //close server and exit process
  server.close(() => process.exit(1));
});
