import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server, Errors } from 'typescript-rest';
import * as swaggerUi from 'swagger-ui-express';
// import * as Controllers from '@controllers/index';

const swaggerDocument = require('../../swagger.json');

const exceptionResolver = (
  err: any,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof Errors.HttpError) {
    if (res.headersSent) {
      // important to allow default error handler to close connection if headers already sent
      return next(err);
    }
    res.set('Content-Type', 'application/json');
    res.status(err.statusCode);
    res.json({ error: err.message, code: err.statusCode });
  } else {
    next(err);
  }
};

export function getApp() {
  const { SERVER_PARSER_EXTENDED, SERVER_PARSER_LIMIT } = process.env;

  const app: express.Application = express();
  app.use(
    bodyParser.urlencoded({
      extended: SERVER_PARSER_EXTENDED === 'true',
      limit: SERVER_PARSER_LIMIT || '2mb'
    })
  );

  app.use(bodyParser.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  Server.loadServices(app, `${__dirname}/../controllers/*.js`);
  app.use(exceptionResolver);

  return app;
}
