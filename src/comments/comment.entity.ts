import { BaseEntity, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: true })
  user: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  movie: string;

  @Column('date', { default: new Date() })
  createdAt: Date;

  @Column('date', { default: new Date() })
  updatedAt: Date;
}
