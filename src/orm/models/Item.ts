import {AllowNull, Column, CreatedAt, DataType, Default, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {Tables} from '../Tables';

@Table({
  timestamps: true,
  tableName: Tables.ITEMS
})
export class Item extends Model<Item> {
  @AllowNull(false)
  @Column
  name: string;

  @Column
  @Default(false)
  active: boolean;
}
