const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/index');
const placeRoute = require('./routes/place');
const continentRoute = require('./routes/continent');
const m4opsDataRoute = require('./routes/m4opsdata');
const featureLayerRoute = require('./routes/featurelayer');

if (!process.env.MONGO_DB_URL) {
  require('dotenv-safe').config();
}

const app = express();
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log(`Error connecting to: ${dbURL}`);
  } else {
    console.log(`Connected to: ${dbURL}`);
  }
});

app.use(cors());
app.options('*', cors()); // enables pre-flight checks across-the-board

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(morgan('combined'));

app.use('/', routes);
app.use('/places', placeRoute);
app.use('/continents', continentRoute);
app.use('/m4opsdata', m4opsDataRoute);
app.use('/featurelayers', featureLayerRoute);

module.exports = app;
