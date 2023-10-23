import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    type: 'string',
    example: 'afkldjfaklejsf9dsfads9fojlk;jq;kwljrlekjrklehrlkjqewr',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
