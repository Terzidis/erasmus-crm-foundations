import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deal } from './deal.entity';
import { User } from './user.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // NOTE, CALL, EMAIL, MEETING

  @Column({ nullable: true })
  note?: string;

  @ManyToOne(() => Deal, (d) => d.activities, { nullable: true, onDelete: 'SET NULL' })
  deal?: Deal;

  @ManyToOne(() => User, (u) => u.activities, { nullable: true, onDelete: 'SET NULL' })
  user?: User;

  @CreateDateColumn()
  createdAt: Date;
}
