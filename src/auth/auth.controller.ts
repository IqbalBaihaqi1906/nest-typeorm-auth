import { Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const accessToken = await this.authService.login(req.user);

    return {
      access_token: accessToken,
    };
  }
}
