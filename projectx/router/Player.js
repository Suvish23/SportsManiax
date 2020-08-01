const express = require('express');
//here .. is to get outside of route folder..
const {
  getplayers,
  createplayer,
  getplayer,
  updateplayer,
  deleteplayer,
} = require('../controllers/Playerresponse');
const router = express.Router();
const { protect } = require('../middelware/auth');
router.route('/').post(protect, createplayer).get(getplayers);
router
  .route('/:id')
  .get(getplayer)
  .delete(deleteplayer)
  .put(protect, updateplayer);

module.exports = router;
