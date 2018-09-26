const config = require(`../config/${process.env.NODE_ENV || 'dev'}Config.js`);
const _ = require('lodash');
const Gifts = require('../models/giftModel');

const cb = (res, rej) => (err, data) => {
    if (err) return rej(err);
    return res(data);
};

const getGifts = email => new Promise((res, rej) => {
    Gifts.get(email, cb(res, rej));
}).then(gifts => gifts ? gifts : []);

const getGiftById = (gift_id, email) => new Promise((res, rej) => {
    Gifts.get(email, gift_id, cb(res, rej));
}).then(gift => gift ? gift : null);

module.exports = {
    getGifts,
    getGiftById
}; 