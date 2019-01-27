import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';

import routes from './routes';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(logger('dev'));
app.use('/api/v1', routes);

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port ${port}`);
});

export default server;
