import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TokenDto } from './dto/token.dto';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    try {
      const { phone, password } = loginDto;
      if (phone != process.env.PHONE) {
        throw new BadRequestException('Telefon raqam xato!');
      }
      if (password != process.env.PASSWORD) {
        throw new BadRequestException('Parol xato!');
      }
      const jwt_payload = { secret: process.env.TOKEN };
      const token = await this.jwtService.signAsync(jwt_payload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(tokenDto: TokenDto) {
    try {
      const data = await this.jwtService.verify(tokenDto.token, {
        secret: process.env.TOKEN_KEY,
      });
      if (!data) {
        throw new UnauthorizedException('Tizimdan chiqishda xatolik!');
      }
      if (data.secret != process.env.TOKEN) {
        throw new UnauthorizedException('Tizimdan chiqishda xatolik!');
      }
      return 'Tizimdan chiqildi';
    } catch (error) {}
  }
}
