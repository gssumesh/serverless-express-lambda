const dynogels = require('dynogels');
const Joi = require('joi');
const config = require(`../config/${process.env.NODE_ENV || 'dev'}Config.js`)
dynogels.AWS.config.update({region: config.aws.region});

const Gifts = dynogels.define('Gifts', {
    hashKey : config.gifts.hashKey,
    rangeKey : config.gifts.rangeKey,
    timestamps : true,
  
    schema : {
      email   : Joi.string().email(),
      gift_id : Joi.number()
    },

    tableName: config.gifts.tableName
  });

module.exports = Gifts;