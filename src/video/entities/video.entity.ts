import { Category } from 'src/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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
}
