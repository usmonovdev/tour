import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TravelDto } from './dto/travel.dto';
import { SearchDto } from './dto/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('travel')
@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @ApiOperation({ summary: 'search travel packages' })
  @Get('search')
  search(@Body() searchDto: SearchDto) {
    return this.travelService.search(searchDto);
  }

  @ApiOperation({ summary: 'add travel package to list' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        from_uz: {
          type: 'string',
        },
        from_ru: {
          type: 'string',
        },
        where_uz: {
          type: 'string',
        },
        where_ru: {
          type: 'string',
        },
        description_uz: {
          type: 'string',
        },
        description_ru: {
          type: 'string',
        },
        fly_date: {
          type: 'Date',
        },
        days: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        type: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() travelDto: TravelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.travelService.create(travelDto, file);
  }

  @ApiOperation({ summary: 'get all travel packages' })
  @Get()
  getAll() {
    return this.travelService.getAll();
  }

  @ApiOperation({ summary: 'get travel package by id' })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.travelService.getById(id);
  }

  @ApiOperation({ summary: 'update travel package' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() travelDto: TravelDto) {
    return this.travelService.update(id, travelDto);
  }

  @ApiOperation({ summary: 'delete travel package' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(id);
  }
}
