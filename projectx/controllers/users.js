const asyncHandler = require('../middelware/async');
const ErrorRespone = require('../utils/errorresponse');
const User = require('../models/User');

//@des    get all users
//@route GET /api/v1/auth/users
//@access  Private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
//@des    get Single user
//@route GET /api/v1/auth/users/:id
//@access  Private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});
//@des    Create  user
//@route Post /api/v1/auth/users
//@access  Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});
//@des    Update  user
//@route Put /api/v1/auth/users/:id
//@access  Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});
//@des    delete  user
//@route Put /api/v1/auth/users/:id
//@access  Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});