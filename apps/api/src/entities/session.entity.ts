import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Tenant } from './tenant.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Tenant)
  tenant: Tenant;

  @Column()
  refreshTokenHash: string;

  @Column({ nullable: true })
  revokedAt: Date;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
