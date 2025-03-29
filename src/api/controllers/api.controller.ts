import { Controller, Get } from "../shared/core";

@Controller('')
export class ApiController {
  @Get('')
  getApi() {
    return {
      message: 'API is running',
    };
  }

  @Get('healthcheck')
  getHealthCheck() {
    return { status: 'OK' };
  }

  @Get('version')
  getVersion() {
    return { version: '1.0.0' };
  }
}