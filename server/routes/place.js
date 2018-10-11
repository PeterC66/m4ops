const express = require('express');

const router = express.Router();
const PlaceController = require('../controllers/PlaceController');

router.get('/', (req, res, next) => {
  PlaceController.findPlaces(req.query, (err, results) => {
    if (err) {
      console.log(err);
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

router.get('/:opscode', (req, res, next) => {
  const { opscode } = req.params;

  PlaceController.findByOpscode(opscode, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: 0,
        data: result,
      });
      return;
    }

    res.status(200).json({
      success: 1,
      data: result,
    });
  });
});

module.exports = router;
