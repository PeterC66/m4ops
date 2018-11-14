const express = require('express');

const router = express.Router();
const PlaceController = require('../controllers/PlaceController');

router.get('/', (req, res, next) => {
  console.log('In AContinent', req, req.query);
  PlaceController.findContinents(req.query, (err, results) => {
    console.log('In BContinent', results);
    if (err) {
      console.log('Error in PCfC', err);
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
