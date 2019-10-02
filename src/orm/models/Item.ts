import {AllowNull, Column, Model, Table} from 'sequelize-typescript';
import {Tables} from '../Tables';

@Table({
  timestamps: true,
  tableName: Tables.ITEMS
})
export class Item extends Model<Item> {
  @AllowNull(false)
  @Column
  name: string;

  @Column({
    defaultValue: false
  })
  active: boolean;
}
