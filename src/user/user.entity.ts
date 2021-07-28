import { BaseEntity, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column('date', { default: new Date() })
  createdAt: Date;

  @Column('date', { default: new Date() })
  updatedAt: Date;
}
