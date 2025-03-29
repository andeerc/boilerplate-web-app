import { Express } from 'express';
import { bootstrapApi } from './shared';
import { controllers } from './routers';
export function configureApi(app: Express) {
  console.log('Configuring API...');
  bootstrapApi(app, controllers);
}