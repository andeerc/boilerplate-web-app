import { Express } from 'express';
import { defaultApplicationRouter } from './application';

export async function loadApi(app: Express) {
  app.get('/api/', defaultApplicationRouter);
}