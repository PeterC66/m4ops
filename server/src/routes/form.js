const express = require('express');

const router = express.Router();
const FormController = require('../controllers/FormController');

router.get('/', (req, res, next) => {
  FormController.findForms(req.query, (err, results) => {
    if (err) {
      console.log('Error in FCfF', err); // eslint-disable-line no-console
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

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  FormController.findFormById(id, (err, result) => {
    if (err) {
      console.log('Error in FCfFBI', err); // eslint-disable-line no-console
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
