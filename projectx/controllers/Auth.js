const asyncHandler = require('../middelware/async');
const ErrorRespone = require('../utils/errorresponse');
const User = require('../models/User');

//@des    Register User
//@route POST /api/v1/auth/register
//@access  Public
exports.register = asyncHandler(async (req, res, next) => {
  //   res.status(200).json({ success: true });

  const { Name, email, password, role } = req.body;
  //create User
  const user = await User.create({
    Name,
    email,
    password,
    role,
  });

  //create token

  sendTokenResponse(user, 200, res);

  res.status(200).json({ success: true, token });
});

//@des    Register User
//@route POST /api/v1/auth/login
//@access  Public

exports.login = asyncHandler(async (req, res, next) => {
  //   res.status(200).json({ success: true });

  const { email, password } = req.body;

  //Validate email and password

  if (!email || !password) {
    return next(new ErrorRespone('Please provide an email and PAssword', 400));
  }
  //Check for User

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorRespone('Invalid credentials', 401));
  }

  //check if password matches

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorRespone('Invalid credentials', 401));
  }
  //create token

  sendTokenResponse(user, 200, res);

  //   res.status(200).json({ success: true, token });
});

// get token from model ,create cookie and send response
sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //   if (!process.env.NODE_ENV === 'production') {
  //     options.secure = true;
  //   }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
