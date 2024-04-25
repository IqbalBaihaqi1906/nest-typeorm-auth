import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column({ type: 'date' })
  dob: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: string;
}
