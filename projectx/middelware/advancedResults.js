const { populate } = require('../models/User');

const advancedResults = (model, populate) => async (req, res, next) => {
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
  query = model.find(JSON.parse(querystr));
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
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  //Executing query
  const results = await query;
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
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};
module.exports = advancedResults;
