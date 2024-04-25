import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 50, unique: true })
  displayName: string;

  @Column({
    type: 'enum',
    enum: ['Bronze', 'Gold', 'Platinum'],
    default: 'Bronze',
  })
  membershipTier: string;

  @Column({ length: 100, nullable: true })
  contactNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
