import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import api from './api';
import * as log from 'winston';
import * as path from 'path';
import typeAPI from '../typeAPI';

let env = process.env.NODE_ENV || 'development';
// Configure the process.env with dotenv. Loads environment variables from the .env file.
if (env === 'development') {
  require('dotenv').config();
}

createConnection().then(async connection => {
  log.add(log.transports.File, { filename: path.join(__dirname, 'server.log') });

  let app = express();
  let server = http.createServer(app);

  // logger
  app.use(morgan('dev'));

  // 3rd party middleware
  app.use(cors({
    exposedHeaders: process.env.CORS_HEADERS
  }));

  app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT
  }));

  typeAPI(app);

  // Use for other necessary endpoints that are not covered by the default CRUD operations already implemented.
  app.use('/api', api());

  server.listen(process.env.PORT || process.env.PORT, () => {
    console.log(`Started on port ${server.address().port}`);
  });

  app.use((err, req, res, next) => {
    log.error(err);
    res.status(500);
    res.json({
      error: true,
      messages: err
    });
  });
}).catch(error => {
  log.error(error);
});
