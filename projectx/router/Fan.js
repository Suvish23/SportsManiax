const express = require('express');
//here .. is to get outside of route folder..
const {
  getprofiles,
  createFanProfile,
  getFanAttribute,
  updateFanProfile,
  deleteProfile,
} = require('../controllers/response');
const router = express.Router();
const { protect } = require('../middelware/auth');
router.route('/').get(getprofiles).post(protect, createFanProfile);
router
  .route('/:id')
  .get(getFanAttribute)
  .delete(deleteProfile)
  .put(updateFanProfile)
  .delete(deleteProfile);

module.exports = router;
