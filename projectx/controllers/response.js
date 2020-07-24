const Profile = require('../models/Profile');
const asyncHandler = require('../middelware/async');
const ErrorRespone = require('../utils/errorresponse');
const { param } = require('../router/Fan');
const player = require('../models/player');
const path = require('path');

exports.getprofiles = asyncHandler(async (req, res, next) => {
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
  query = Profile.find(JSON.parse(querystr));
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
  const total = await Profile.countDocuments();
  query = query.skip(startIndex).limit(limit);
  //Executing query
  const Attributess = await query;
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
    count: Attributess.length,
    sucess: true,
    pagination: pagination,
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
