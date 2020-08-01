const express = require('express');
//here .. is to get outside of route folder..
const {
  getprofiles,
  createFanProfile,
  getFanAttribute,
  updateFanProfile,
  deleteProfile,
} = require('../controllers/response');
const profile = require('../models/Profile');
const advancedResults = require('../middelware/advancedResults');
const router = express.Router();
const { protect, authorize } = require('../middelware/auth');
router
  .route('/')
  .get(advancedResults(profile), getprofiles)
  .post(protect, authorize('publisher', 'admin'), createFanProfile);
router
  .route('/:id')
  .get(getFanAttribute)
  .delete(protect, authorize('user', 'admin'), deleteProfile)
  .put(protect, authorize('user', 'admin'), updateFanProfile);

module.exports = router;
