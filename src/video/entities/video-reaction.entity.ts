import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Video } from './video.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('video_reactions')
@Unique(['video', 'user'])
export class VideoReaction {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Video, (video) => video.reactions, { onDelete: 'CASCADE' })
  video: Video;

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  reaction: 'like' | 'dislike';
}
