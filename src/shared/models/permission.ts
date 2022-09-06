import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Group } from './group';

@Table
export class Permission extends Model {
  @ForeignKey(() => Group)
  @BelongsTo(() => Group, {
    foreignKey: 'groupId',
  })
  group: Group;
  @Column
  read: boolean;
  @Column
  write: boolean;
  @Column
  delete: boolean;
  @Column
  share: boolean;
  @Column
  upload_files: boolean;
}
