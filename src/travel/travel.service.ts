import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Travel } from './model/app.model';
import { TravelDto } from './dto/travel.dto';
import { SearchDto } from './dto/search.dto';
import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel) private readonly travelRepo: typeof Travel,
  ) {}

  public async upload(
    file: Express.Multer.File,
    path: string,
    fileName: string,
  ) {
    try {
      const storage = getStorage();
      const fileExtension = file.originalname.split('.').pop();
      const fileRef = ref(storage, `${path}/${fileName}.${fileExtension}`);
      const uploaded = await uploadBytes(fileRef, file.buffer);
      return uploaded.metadata.fullPath;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async search(searchDto: SearchDto) {
    try {
      let travel: any;
      if (searchDto.fly_date) {
        travel = await this.travelRepo.findAll({
          where: {
            [Op.and]: [
              { from_uz: searchDto.from_uz },
              { where_uz: searchDto.where_uz },
              { fly_date: searchDto.fly_date },
            ],
          },
        });
        return travel;
      }
      travel = await this.travelRepo.findAll({
        where: {
          [Op.and]: [
            { from_uz: searchDto.from_uz },
            { where_uz: searchDto.where_uz },
          ],
        },
      });
      return travel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(travelDto: TravelDto, file: Express.Multer.File) {
    try {
      const exs = v4();
      const image = await this.upload(file, 'image', exs);
      const travel = await this.travelRepo.create({ ...travelDto, image });
      return travel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll() {
    try {
      const travels = await this.travelRepo.findAll();
      console.log('salom');
      return travels;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: string) {
    try {
      const travel = await this.travelRepo.findByPk(id);
      return travel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, travelDto: TravelDto) {
    try {
      const travel = await this.travelRepo.update(travelDto, {
        where: { id },
        returning: true,
      });
      return travel[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const travel = await this.getById(id);
      travel.destroy();
      return travel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
