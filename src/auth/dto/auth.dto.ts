import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    example: '+998900010101',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    type: 'string',
    example: 'admin001',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
