const _ = require('lodash');
const errorMap = require('../../constants/errors');

const GIFTS = [
    {id: 1, name: "playstation"},
    {id: 2, name: "bike"},
    {id: 3, name: "ticket to world cup"},
    {id: 4, name: "watch"},
    {id: 5, name: "speaker"},
];

const log = (e, message, req) => {
    console.log(message);
    console.log(e);
    console.log('Request Path');
    console.log(_.get(req, 'url'));
    console.log('Request Query:');
    console.log(_.get(req, 'query'));
    console.log('Request Body:');
    console.log(_.get(req, 'body'));
    console.log('Request Email:');
    console.log(_.get(req, 'context.auth.email'));
}

const sendInvalidCode = (err, req, res, e) => {
    log(e || err.message, err.message, req);
    return res.status(err.code).send(err.message);
}

/**
 * @api {get} /gift/{id} Request Gift by Id
 * @apiName GetGiftById
 * @apiGroup Gifts
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Users unique id-token. eg: Authorization: exasdhasdakdhjkXXX.
 * 
 * @apiParam {Number} giftId Unique giftId.
 * @apiSuccess (200) {Number}   id   Gift Id.
 * @apiSuccess (200) {String}   name  Gift Name.
 */
const getGiftById = (req, res) => {
    const email = _.get(req, 'context.auth.email');
    const { giftId } = _.get(req, 'params') || {};
    if (!email || !giftId) return sendInvalidCode(errorMap.INVALID_PARAMETER, req, res);  

    res.json(_.find(GIFTS, gift => gift.id === parseInt(giftId)));
};

/**
 * @api {get} /gifts Request Gift list
 * @apiName GetGifts
 * @apiGroup Gifts
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Users unique id-token. eg: Authorization: exasdhasdakdhjkXXX.
 * 
 * @apiSuccess (200) {Object[]} gifts       List of gift items.
 * @apiSuccess (200) {Number}   gifts.id   Gift Id.
 * @apiSuccess (200) {String}   gifts.name  Gift Name.
 */
const getGifts = (req, res) => {
    res.json(GIFTS);
};

module.exports = {
    getGifts,
    getGiftById
}; 