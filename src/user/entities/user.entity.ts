import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ShortForm } from 'src/shortform/entities/shortform.entity';
import { Video } from 'src/video/entities/video.entity';
import { VideoReaction } from 'src/video/entities/video-reaction.entity';

@Entity('user')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  customId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  bannerUrl: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => ShortForm, (shortForm) => shortForm.user)
  shortForms: ShortForm[];

  @OneToMany(() => VideoReaction, (reaction) => reaction.user)
  reactions: VideoReaction[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
