import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserGroup } from './user-group';
import { Group } from './group';

@Table
export class User extends Model {
  @BelongsToMany(() => Group, () => UserGroup, 'userId')
  groups: Group[];

  @Column
  login: string;

  @Column({ primaryKey: true, type: DataType.UUID })
  userId: string;

  @Column
  password: string;

  @Column
  age: number;

  @Column
  isDeleted: boolean;
}
