import { Express, Request, Response } from 'express';
import { Logger } from './logger';

export function bootstrapApi(app: Express, controllers: typeof Function[]) {
  const logger = new Logger('Api');

  for (const controller of controllers) {
    const instance: any = new controller();
    if (instance.routes) {
      // Register the controller path with the app instance
      instance.routes.forEach((route: any) => {
        const method = route.method.toLowerCase();

        app[method as keyof Express](route.path, async (req: Request, res: Response, next: Function) => {
          const functionParameters: any[] = [];

          // check parameters in function and add them to the request object
          const params: any[] = instance.params || []
          if (params.length > 0) {
            params.forEach((param: { name: string; index: number }) => {
              const value = req.params[param.name]
              functionParameters[param.index] = value;
            });
          }

          // check body in function and add them to the request object
          if (instance.body) {
            functionParameters[instance.body.index] = req.body;
          }

          // check query in function and add them to the request object
          const query: any[] = instance.query || []
          if (query.length > 0) {
            query.forEach((param: { name: string; index: number }) => {
              const value = req.query[param.name]
              functionParameters[param.index] = value;
            });
          }

          // check headers in function and add them to the request object
          const headers: any[] = instance.headers || []
          if (headers.length > 0) {
            headers.forEach((param: { name: string; index: number }) => {
              const value = req.headers[param.name]
              functionParameters[param.index] = value;
            });
          }

          // Call the route handler with the parameters and send the response
          const result = instance[route.handler](...functionParameters);

          if (result instanceof Promise) {
            // If the result is a promise, wait for it to resolve
            try {
              const data = await result;
              res.json(data); // Send the response as JSON
            } catch (error) {
              next(error); // Pass the error to the error handling middleware
            }
          }
          else {
            res.json(result); // Send the response as JSON
          }
        });

        logger.info(`Registered route: ${route.path}`); // Log the registered route
      });
    }
  }

  // // Load all route classes dynamically
  // routeFiles.forEach(file => {
  //   let routeModule;
  //   if (file.endsWith('.js')) {
  //     routeModule = require(join(routesPath, file)).default;
  //   }
  //   else if (file.endsWith('.ts')) {
  //     routeModule = require(join(routesPath, file)).default;
  //   }

  //   for (const key in routeModule) {
  //     const RouteClass = routeModule[key];
  //     if (typeof RouteClass === 'function') {
  //       // Check if the class has a controllerPath property
  //       if (RouteClass.controllerPath) {
  //         const instance = new RouteClass();
  //         // Register the routes defined in the class
  //         if (instance.routes) {
  //           instance.routes.forEach((route: any) => {
  //             const method = route.method.toLowerCase();
  //             app[method as keyof Express](route.path, async (req: Request, res: Response, next: NextFunction) => {
  //               const functionParameters: any[] = []


  //               // check parameters in function and add them to the request object
  //               const params: any[] = instance.params || []
  //               if (params.length > 0) {
  //                 params.forEach((param: { name: string; index: number }) => {
  //                   const value = req.params[param.name]
  //                   functionParameters[param.index] = value;
  //                 });
  //               }

  //               // check body in function and add them to the request object
  //               if (instance.body) {
  //                 functionParameters[instance.body.index] = req.body;
  //               }

  //               // check query in function and add them to the request object
  //               const query: any[] = instance.query || []
  //               if (query.length > 0) {
  //                 query.forEach((param: { name: string; index: number }) => {
  //                   const value = req.query[param.name]
  //                   functionParameters[param.index] = value;
  //                 });
  //               }

  //               // check headers in function and add them to the request object
  //               const headers: any[] = instance.headers || []
  //               if (headers.length > 0) {
  //                 headers.forEach((param: { name: string; index: number }) => {
  //                   const value = req.headers[param.name]
  //                   functionParameters[param.index] = value;
  //                 });
  //               }

  //               // Call the route handler with the parameters and send the response
  //               const result = instance[route.handler](...functionParameters);

  //               if (result instanceof Promise) {
  //                 // If the result is a promise, wait for it to resolve
  //                 try {
  //                   const data = await result;
  //                   res.json(data); // Send the response as JSON
  //                 } catch (error) {
  //                   next(error); // Pass the error to the error handling middleware
  //                 }
  //               }
  //               else {
  //                 res.json(result); // Send the response as JSON
  //               }
  //             });
  //           });
  //         }
  //         // Register the controller path with the app instance
  //         logger.info(`Registered route: ${RouteClass.controllerPath}`); // Log the registered route
  //       }
  //     }
  //   }
  // });
}