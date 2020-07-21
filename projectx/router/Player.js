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
router.route('/').post(createplayer).get(getplayers);
router.route('/:id').get(getplayer).delete(deleteplayer).put(updateplayer);

module.exports = router;
