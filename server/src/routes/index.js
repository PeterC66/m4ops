const express = require('express');

const router = express.Router();

// const envars = JSON.stringify(process.env);

router.get('/', (req, res, next) => {
  res.send(`Nothing after the \'\/\'.`);
});

module.exports = router;
