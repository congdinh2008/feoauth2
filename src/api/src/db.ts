import mongoose from 'mongoose';
import { config } from './config';

export function connectDb() {
  return mongoose.connect(config.database, { useNewUrlParser: true });
}

export function disconnect() {
  return mongoose.disconnect();
}
