'use strict'
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const authMiddleware = require('./src/middlewares/authMiddleware');
const v1GiftController = require('./src/controllers/v1/giftControllers');
const v2GiftController = require('./src/controllers/v2/giftControllers');

const app = express();
// Set up the routing.
var v1 = express.Router();
var v2 = express.Router();

const router = express.Router()

if (process.env.NODE_ENV === 'test') {

} else {
  router.use(compression())
}
app.use(express.static(__dirname + '/public'));

//v1.use();
v1.use(cors())
v1.use(bodyParser.json())
v1.use(bodyParser.urlencoded({ extended: true }))

v2.use(authMiddleware);
v2.use(cors())
v2.use(bodyParser.json())
v2.use(bodyParser.urlencoded({ extended: true }))

v1.get('/gifts', v1GiftController.getGifts);
v1.get('/gifts/:giftId', authMiddleware, v1GiftController.getGiftById);

v2.get('/gifts', v2GiftController.getGifts)

app.use('/v1', v1);
app.use('/v2', v2);

module.exports = app
