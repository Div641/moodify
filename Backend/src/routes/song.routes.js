const express = require('express');
const router = express.Router();
const songModel = require('../models/song.model');
const upload = require('../middlewares/upload.middleware');
const songController = require('../controller/song.controller');


//POST/api/songs/
router.post("/",upload.single('song'),songController.uploadSong)


router.get("/",songController.getSongs)

module.exports = router;