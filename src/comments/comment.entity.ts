import { UserEntity } from 'src/user/user.entity';
import { BaseEntity, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column(() => UserEntity)
  user: UserEntity;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  movie: number;
  
  @Column('date', { default: new Date() })
  createdAt: Date;

  @Column('date', { default: new Date() })
  updatedAt: Date;
}
