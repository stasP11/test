import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { Permission } from './permission';
import { UserGroup } from './user-group';
import { User } from './user';

@Table
export class Group extends Model {
  @Column
  name: string;
  @Column({ primaryKey: true, type: DataType.UUID })
  groupId: string;
  @BelongsToMany(() => User, () => UserGroup, 'groupId')
  users: User[];
  @HasOne(() => Permission, {
    foreignKey: 'groupId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  permissions: Permission[];
}
