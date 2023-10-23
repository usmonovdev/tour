import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Travel } from './model/app.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Travel]), JwtModule.register({})],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
