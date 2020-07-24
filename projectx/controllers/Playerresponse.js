const Attributes = require('../models/player');
const asyncHandler = require('../middelware/async');
const ErrorRespone = require('../utils/errorresponse');
const player = require('../models/player');

exports.getplayers = asyncHandler(async (req, res, next) => {
  let query;
  let reqQuery = { ...req.query };
  //fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  //loop over removeFields and delete then from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //incase to search for specific item in DB
  let querystr = JSON.stringify(reqQuery);
  querystr = querystr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  // console.log(req.query);
  query = Attributes.find(JSON.parse(querystr));
  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Attributes.countDocuments();
  query = query.skip(startIndex).limit(limit);
  //Executing query
  const players = await query;
  //Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    count: players.length,
    sucess: true,
    pagination: pagination,
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
