const express = require('express');
const router = express.Router();
const {createShortLink,redirectToOriginalLink} = require('../controller/linkContoller');
router.post('/shorten',createShortLink);
router.get('/:shortUrl' , redirectToOriginalLink);
module.exports = router;