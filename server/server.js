import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import ErrorMiddleware from './middleware/ErrorMiddleware';

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', routes);

app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.errorHandler);

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port ${port}`);
});

export default server;
