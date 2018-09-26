const serverless = require('serverless-http');
const { get } = require('lodash');
const app = require('./app');

const setGlobalContext = {
    request: function(req, event, context) {
      req.global = req.global || {};
      req.context = req.context || {};
      req.context.auth = get(event, 'requestContext.authorizer.claims');
    },
    response: function(response, event, context) {
    }
  }

const handler = serverless(app, setGlobalContext);
module.exports = { handler };