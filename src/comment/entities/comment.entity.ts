import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: number;

  @Column()
  username: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
