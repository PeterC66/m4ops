const express = require('express');

const router = express.Router();
const PlaceController = require('../controllers/PlaceController');

router.get('/', (req, res, next) => {
  PlaceController.findM4OPSData(req.query, (err, results) => {
    if (err) {
      console.log('Error in PCfM4D', err);
      res.json({
        success: 0,
        error: err,
      });
      return;
    }
    res.json({
      success: 1,
      data: results,
    });
  });
});

module.exports = router;
