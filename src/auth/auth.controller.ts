import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@ApiTags('admin-login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login admin' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'logout admin' })
  @Post('logout')
  logout(@Body() tokenDto: TokenDto) {
    return this.authService.logout(tokenDto);
  }
}
