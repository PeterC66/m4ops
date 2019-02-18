const express = require('express');

const router = express.Router();
const FeatureLayerController = require('../controllers/FeatureLayerController');


router.get('/', (req, res, next) => {
  res.send('Need OPS_Xxxx after the \'featurelayers\/\'');
});

router.get('/:ops_layer', (req, res, next) => {
  const { ops_layer } = req.params;

  FeatureLayerController.findByOps_Layer(ops_layer, (err, result) => {
    console.log('In FLCfBOL', err, result); // eslint-disable-line no-console
    if (err) {
      console.log('Error in FLCfBOL', err); // eslint-disable-line no-console
      res.status(500).json({
        success: 0,
        data: result,
      });
      return;
    }

    if (result) {
      res.status(200).json({
        type: result.type,
        features: result.features,
      });
      return;
    }

    console.log('Null result in FLCfBOL'); // eslint-disable-line no-console
    res.status(200).json({
      type: 'FeatureCollection',
      features: [],
    });
    return;

  });
});

module.exports = router;
