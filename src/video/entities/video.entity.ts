import { Category } from 'src/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { VideoReaction } from './video-reaction.entity';
import { VideoPlayHistory } from 'src/video-history/entities/video-play-history.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @ManyToOne(() => Category, (category) => category.videos)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  @Column({ default: 0 }) // 초기값 0
  likes: number;

  @Column({ default: 0 }) // 초기값 0
  dislikes: number;

  @OneToMany(() => VideoReaction, (reaction) => reaction.video)
  reactions: VideoReaction[];

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => VideoPlayHistory, (history) => history.video)
  playHistory: VideoPlayHistory[];

  @CreateDateColumn()
  watched_at: Date;
}
