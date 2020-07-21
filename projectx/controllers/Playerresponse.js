const Attributes = require('../models/player');
const asyncHandler = require('../middelware/async');

exports.getplayers = asyncHandler(async (req, res, next) => {
  const players = await Attributes.find();
  res.status(200).json({
    count: players.length,
    sucess: true,
    data: players,
  });
});
exports.getplayer = asyncHandler(async (req, res, next) => {
  const player = await Attributes.findById(req.params.id);
  // if any id is wrong then we use it.....
  if (!player) {
    return next(
      new ErrorRespone(
        `Fan Profile not found with Id${req.params.id} at the database`,
        404
      )
    );
  }
  res.status(200).json({
    sucess: true,
    data: player,
  });
});
//@access  Private
exports.createplayer = asyncHandler(async (req, res, next) => {
  const play = await Attributes.create(req.body);
  res.status(201).json({
    success: true,
    data: play,
  });
});
//@des    Update profile
//@route PUT /api/v1/bootcamps/:id
//@access  Private
exports.updateplayer = asyncHandler(async (req, res, next) => {
  const updat = await Attributes.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!updat) {
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
exports.deleteplayer = asyncHandler(async (req, res, next) => {
  const delt = await Attributes.findByIdAndDelete(req.params.id);
  res.status(200).json({
    sucess: true,
    data: {},
  });
  if (!delt) {
    return next(
      new ErrorRespone(
        `Bootcamp not found with id of ${req.params.id} at the database`,
        404
      )
    );
  }
});
