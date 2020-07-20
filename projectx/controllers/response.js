const Profile = require('../models/Profile');
const asyncHandler = require('../middelware/async');
const ErrorRespone = require('../utils/errorresponse');
exports.getFansAttributes = asyncHandler(async (req, res, next) => {
  const Attributess = await Profile.find();
  //if any id is wrong then we use it.....
  if (!Attributess) {
    return next(
      new ErrorRespone(
        `Fan Profile not found with Id${req.params.id} at the database`,
        404
      )
    );
  }
  res.status(200).json({
    sucess: true,
    data: Attributess,
  });
});
exports.getFanAttribute = asyncHandler(async (req, res, next) => {
  const Attribute = await Profile.findById(req.params.id);
  // if any id is wrong then we use it.....
  if (!Attribute) {
    return next(
      new ErrorRespone(
        `Fan Profile not found with Id${req.params.id} at the database`,
        404
      )
    );
  }
  res.status(200).json({
    sucess: true,
    data: Attribute,
  });
});
//@access  Private
exports.createFanProfile = asyncHandler(async (req, res, next) => {
  const fan = await Profile.create(req.body);
  res.status(201).json({
    success: true,
    data: fan,
  });
});
//@des    Update profile
//@route PUT /api/v1/bootcamps/:id
//@access  Private
exports.updateFanProfile = asyncHandler(async (req, res, next) => {
  const update = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!update) {
    return next(
      new ErrorRespone(
        `Bootcamp not found with id of ${req.params.id} at the database`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
// @des    Delete Profile
//@route Delete /api/v1/bootcamps/:id
//@access  Public
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const del = await Profile.findByIdAndDelete(req.params.id);
  res.status(200).json({
    sucess: true,
    data: {},
  });
  if (!del) {
    return next(
      new ErrorRespone(
        `Bootcamp not found with id of ${req.params.id} at the database`,
        404
      )
    );
  }
});
