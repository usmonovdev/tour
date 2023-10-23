import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    type: 'string',
    example: 'Tashkent',
  })
  from_uz: string;

  @ApiProperty({
    type: 'string',
    example: 'Dubai',
  })
  where_uz: string;

  @ApiProperty({
    type: 'date',
    example: '2023.12.02',
  })
  fly_date?: Date;
}
