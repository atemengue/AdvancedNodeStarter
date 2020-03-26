/** @format */
// jest.setTimeout(10000); if the testing environnement doesn't support 5000

require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise; // promise env for mongoose
mongoose.connect(keys.mongoURI, { useMongoClient: true });
