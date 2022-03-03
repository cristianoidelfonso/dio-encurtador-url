import mongoose from 'mongoose';
import { config } from '../config/Constants'

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      // mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
      await mongoose.connect(config.MONGO_CONNECTION);
      console.log('Database connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
}
