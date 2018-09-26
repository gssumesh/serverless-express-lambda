const config = require(`../config/${process.env.NODE_ENV || 'dev'}Config.js`)
const errorMap = require('../constants/errors');
const { get } = require('lodash');

const authMiddleware = (req, res, next) => {
    const auth = get(req, 'context.auth');
	if (!auth) return res.status(errorMap.UNAUTHORIZED_ACCESS.code).send(errorMap.UNAUTHORIZED_ACCESS.message);
	next();

}

module.exports = authMiddleware;