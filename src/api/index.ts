import { Express } from 'express';
import { controllers } from './controllers';
import { bootstrapApi } from './shared/core';
export function configureApi(app: Express) {
  console.log('Configuring API...');
  bootstrapApi(app, controllers);
}