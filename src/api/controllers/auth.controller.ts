import { Body, Controller, Post } from "../shared/core";

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() { email, password }: { email: string; password: string }) {
    // Here you would typically validate the user credentials and return a token or session info
    // For demonstration, we'll just return a mock response
    return {
      message: 'Login successful',
      user: {
        email,
        token: 'mock-token',
      },
    };
  }
}