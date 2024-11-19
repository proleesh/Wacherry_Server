import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Video } from 'src/video/entities/video.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  categoryCount: number;

  @OneToMany(() => Video, (video) => video.category)
  videos: Video[];

  async updateCategoryCount() {
    this.categoryCount = this.videos ? this.videos.length : 0;
  }
}
