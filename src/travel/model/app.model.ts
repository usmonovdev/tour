import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TravelAttributes {
  id: string;
  from_uz: string;
  from_ru: string;
  where_uz: string;
  where_ru: string;
  description_uz: string;
  description_ru: string;
  fly_date: Date;
  days: number;
  price: number;
  type: string;
  image: string;
}

@Table({ tableName: 'travel' })
export class Travel extends Model<Travel, TravelAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  from_uz: string;

  @Column({
    type: DataType.STRING,
  })
  from_ru: string;

  @Column({
    type: DataType.STRING,
  })
  where_uz: string;

  @Column({
    type: DataType.STRING,
  })
  where_ru: string;

  @Column({
    type: DataType.TEXT,
  })
  description_uz: string;

  @Column({
    type: DataType.TEXT,
  })
  description_ru: string;

  @Column({
    type: DataType.DATE,
  })
  fly_date: Date;

  @Column({
    type: DataType.INTEGER,
  })
  days: number;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  type: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;
}
