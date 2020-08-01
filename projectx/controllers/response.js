const Profile = require('../models/Profile');
const asyncHandler = require('../middelware/async');
const ErrorRespone = require('../utils/errorresponse');
const { param } = require('../router/Fan');
const player = require('../models/player');
const path = require('path');

exports.getprofiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  //Add user to req.body
  req.body.user = req.user.id;
  //check for published profiles
  const createdfan = await Profile.findOne({ user: req.user.id });
  //if the user is not a admin ,they can only add one profile
  if (createdfan && req.user.role !== 'admin') {
    return next(
      new ErrorRespone(`Fan with ID${req.user.id} has already created`, 400)
    );
  }
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
  let update = await Profile.findById(req.params.id);
  if (!update) {
    return next(
      new ErrorRespone(
        `Fan not found with id of ${req.params.id} at the database`,
        404
      )
    );
  }
  //make sure user is bootcamp owner
  if (update.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorRespone(
        `user ${req.params.id} is not authorized to update this Profile`,
        401
      )
    );
  }
  update = await Profile.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: update,
  });
});
// @des    Delete Profile
//@route Delete /api/v1/bootcamps/:id
//@access  Public
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const del = await Profile.findByIdAndDelete(req.params.id);
  if (!del) {
    return next(
      new ErrorRespone(
        `Bootcamp not found with id of ${req.params.id} at the database`,
        404
      )
    );
  }
  res.status(200).json({
    sucess: true,
    data: {},
  });
  //make sure user is bootcamp owner
  if (del.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorRespone(
        `user ${req.params.id} is not authorized to delete this Profile`,
        401
      )
    );
  }
});
