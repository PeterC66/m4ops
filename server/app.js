const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const placeRoute = require('./routes/place');
const continentRoute = require('./routes/continent');
const m4opsDataRoute = require('./routes/m4opsdata');
const routes = require('./routes/index');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log(`Error connecting to: ${dbURL}`);
  } else {
    console.log(`Connected to: ${dbURL}`);
  }
});

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/places', placeRoute);
app.use('/continents', continentRoute);
app.use('/m4opsdata', m4opsDataRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
