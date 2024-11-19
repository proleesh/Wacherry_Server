import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ShortForm } from 'src/shortform/entities/shortform.entity';

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

  @OneToMany(() => ShortForm, (shortForm) => shortForm.user)
  shortForms: ShortForm[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
