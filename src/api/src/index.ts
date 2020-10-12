import express, { Express } from 'express';
import { AddressInfo } from 'net';

import bodyParser from 'body-parser';
import cors from 'cors';
import http, { Server } from 'http';
import morgan from 'morgan';

import { config } from './config';

import { connectDb, disconnect } from './db';

import { appRouter } from './routes';

const app: Express = express();
const server: Server = http.createServer(app);

app.use(morgan('dev'));

app.use('/upload', express.static('upload'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

app.use('/api', appRouter);

connectDb()
  .then(() => {
    // listen to port from .env or config file
    server.listen(process.env.PORT || config.port, () => {
      console.log(`Started on port ${(server.address() as AddressInfo).port}`);
    });
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

function cleanup() {
  disconnect().then(() => {
    process.exit(0);
  });
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export { app };
