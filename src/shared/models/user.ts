import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  login: string;

  @Column({ primaryKey: true, type: DataType.UUID })
  user_id: string;

  @Column
  password: string;

  @Column
  age: number;

  @Column
  isDeleted: boolean;
}
