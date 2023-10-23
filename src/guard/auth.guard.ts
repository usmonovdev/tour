import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth_header = req.headers.authorization;
    if (!auth_header) {
      throw new UnauthorizedException({
        message: 'Token topilmadi!',
      });
    }
    const bearer = auth_header.split(' ')[0];
    const token = auth_header.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Token topilmadi!',
      });
    }
    let user: any;
    try {
      user = this.jwtService.verify(token, {
        secret: process.env.TOKEN_KEY,
      });
      if (user.secret != process.env.TOKEN) {
        throw new UnauthorizedException('Tokenda xatolik!');
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Token vaqti tugagan!',
      });
    }
    return true;
  }
}
