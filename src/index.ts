import { URLController } from './controller/URLController';
import express, { NextFunction, Request, Response } from 'express';
import { MongoConnection } from './database/MogoConnection';

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

api.get('/teste', (reques: Request, response: Response, next: NextFunction) => {
  response.json({'success get': true})
});

const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(5000, () => console.log('Start Express Listening Port 5000'));