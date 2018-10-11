const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Nothing after the \'\/\'');
});

module.exports = router;
