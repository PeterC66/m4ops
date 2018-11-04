const express = require('express');

const router = express.Router();
const FeatureLayerController = require('../controllers/FeatureLayerController');


router.get('/', (req, res, next) => {
  res.send('Need OPS_Xxxx after the \'featurelayer\/\'');
});

router.get('/:ops_layer', (req, res, next) => {
  const { ops_layer } = req.params;

  FeatureLayerController.findByOps_Layer(ops_layer, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: 0,
        data: result,
      });
      return;
    }

    res.status(200).json({
      type: result.type,
      features: result.features,
    });
  });
});

module.exports = router;
