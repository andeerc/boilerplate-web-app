import 'reflect-metadata';


export function createRouteDecorator(method: string, path: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // Ensure the target has a routes array to store route information
    if (!target.routes) {
      target.routes = [];
    }

    // Create a route object with method and path
    const route = {
      method,
      path,
      handler: descriptor.value.name, // Use the method name as the handler
    };

    // Push the route object to the routes array of the target
    target.routes.push(route);

    // Return the original descriptor (unchanged)
    return descriptor;
  }
}

/**
 * A decorator to define a controller for a set of routes.
 * @param path - The path for the controller. This will be used to group the routes under this controller.
 * @returns A class decorator that adds the controller path to the target class.
 *
 */
export function Controller(path: string): ClassDecorator {
  return (target: any) => {
    let controllerPath = path.startsWith('/') ? path : '/' + path; // Ensure the path starts with a leading slash
    controllerPath = '/api' + controllerPath; // Prefix the path with '/api'
    if (controllerPath.endsWith('/')) {
      controllerPath = controllerPath.slice(0, -1); // Remove trailing slash
    }
    if (controllerPath.startsWith('/')) {
      controllerPath = controllerPath.substring(1); // Remove leading slash
    }

    Reflect.defineMetadata('design:paramtypes', controllerPath, target); // Store the controller path in metadata

    return target
  }
}

/**
 * A decorator to define a route for a controller method.
 * @param path - The path for the route. This will be used to define the endpoint for the route.
 * @returns A method decorator that adds the route information to the target method.
 */
export function Get(path: string): MethodDecorator {
  return createRouteDecorator('GET', path);
}

/**
 * A decorator to define a route for a controller method.
 * @param path - The path for the route. This will be used to define the endpoint for the route.
 * @returns A method decorator that adds the route information to the target method.
 */
export function Post(path: string): MethodDecorator {
  return createRouteDecorator('POST', path);
}

/**
 * A decorator to define a route for a controller method.
 * @param path - The path for the route. This will be used to define the endpoint for the route.
 * @returns A method decorator that adds the route information to the target method.
 */
export function Put(path: string): MethodDecorator {
  return createRouteDecorator('PUT', path);
}

/**
 * A decorator to define a route for a controller method.
 * @param path - The path for the route. This will be used to define the endpoint for the route.
 * @returns A method decorator that adds the route information to the target method.
 */
export function Delete(path: string): MethodDecorator {
  return createRouteDecorator('DELETE', path);
}

/**
 * A decorator to define a route for a controller method.
 * @param path - The path for the route. This will be used to define the endpoint for the route.
 * @returns A method decorator that adds the route information to the target method.
 */
export function Patch(path: string): MethodDecorator {
  return createRouteDecorator('PATCH', path);
}

export function Param(name: string): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a params array to store parameter information
    if (!target.params) {
      target.params = [];
    }

    // Create a parameter object with name and index
    const param = {
      name,
      index: parameterIndex,
    };

    // Push the parameter object to the params array of the target method
    target.params.push(param);
  }
}

export function Query(name: string): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a query array to store query information
    if (!target.query) {
      target.query = [];
    }

    // Create a query object with name and index
    const query = {
      name,
      index: parameterIndex,
    };

    // Push the query object to the query array of the target method
    target.query.push(query);
  }
}

export function Body(): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a body array to store body information
    if (!target.body) {
      target.body = [];
    }

    // Create a body object with index
    const body = {
      index: parameterIndex,
    };

    // Push the body object to the body array of the target method
    target.body.push(body);
  }
}

export function Header(name: string): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a headers array to store header information
    if (!target.headers) {
      target.headers = [];
    }

    // Create a header object with name and index
    const header = {
      name,
      index: parameterIndex,
    };

    // Push the header object to the headers array of the target method
    target.headers.push(header);
  }
}

export function Middleware(middleware: Function): MethodDecorator {
  return (target: any, propertyKey: string | symbol | undefined, descriptor: PropertyDescriptor) => {
    // Ensure the target has a middleware array to store middleware information
    if (!target.middleware) {
      target.middleware = [];
    }

    // Push the middleware function to the middleware array of the target method
    target.middleware.push(middleware);
  }
}

export function Use(middleware: Function): ClassDecorator {
  return (target: any) => {
    // Ensure the target has a middleware array to store middleware information
    if (!target.middleware) {
      target.middleware = [];
    }

    // Push the middleware function to the middleware array of the target class
    target.middleware.push(middleware);
  }
}

export function ErrorHandler(errorHandler: Function): MethodDecorator {
  return (target: any, propertyKey: string | symbol | undefined, descriptor: PropertyDescriptor) => {
    // Ensure the target has an errorHandlers array to store error handler information
    if (!target.errorHandlers) {
      target.errorHandlers = [];
    }

    // Push the error handler function to the errorHandlers array of the target method
    target.errorHandlers.push(errorHandler);
  }
}

export function ErrorHandlerClass(errorHandlerClass: Function): ClassDecorator {
  return (target: any) => {
    // Ensure the target has an errorHandlers array to store error handler information
    if (!target.errorHandlers) {
      target.errorHandlers = [];
    }

    // Push the error handler class to the errorHandlers array of the target class
    target.errorHandlers.push(errorHandlerClass);
  }
}

export function Response(): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a response array to store response information
    if (!target.response) {
      target.response = [];
    }

    // Create a response object with index
    const response = {
      index: parameterIndex,
    };

    // Push the response object to the response array of the target method
    target.response.push(response);
  }
}

export function Request(): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a request array to store request information
    if (!target.request) {
      target.request = [];
    }

    // Create a request object with index
    const request = {
      index: parameterIndex,
    };

    // Push the request object to the request array of the target method
    target.request.push(request);
  }
}

export function Next(): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // Ensure the target has a next array to store next information
    if (!target.next) {
      target.next = [];
    }

    // Create a next object with index
    const next = {
      index: parameterIndex,
    };

    // Push the next object to the next array of the target method
    target.next.push(next);
  }
}