"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const typescript_rest_1 = require("typescript-rest");
const swaggerUi = require("swagger-ui-express");
// import * as Controllers from '@controllers/index';
const swaggerDocument = require('../../swagger.json');
const exceptionResolver = (err, _req, res, next) => {
    if (err instanceof typescript_rest_1.Errors.HttpError) {
        if (res.headersSent) {
            // important to allow default error handler to close connection if headers already sent
            return next(err);
        }
        res.set('Content-Type', 'application/json');
        res.status(err.statusCode);
        res.json({ error: err.message, code: err.statusCode });
    }
    else {
        next(err);
    }
};
function getApp() {
    const { SERVER_PARSER_EXTENDED, SERVER_PARSER_LIMIT } = process.env;
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: SERVER_PARSER_EXTENDED === 'true',
        limit: SERVER_PARSER_LIMIT || '2mb'
    }));
    app.use(bodyParser.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    typescript_rest_1.Server.loadServices(app, `${__dirname}/../controllers/*.js`);
    app.use(exceptionResolver);
    return app;
}
exports.getApp = getApp;
//# sourceMappingURL=index.js.map