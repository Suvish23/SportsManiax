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
router.route('/').post(createFanProfile).get(getprofiles);
router
  .route('/:id')
  .get(getFanAttribute)
  .delete(deleteProfile)
  .put(updateFanProfile)
  .delete(deleteProfile);

module.exports = router;
