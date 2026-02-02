import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { Contact } from './contact.entity';
import { Activity } from './activity.entity';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  value: number;

  @Column({ default: 'OPEN' })
  status: string;

  @ManyToOne(() => Company, (c) => c.deals, { nullable: true, onDelete: 'SET NULL' })
  company?: Company;

  @ManyToOne(() => Contact, (c) => c.deals, { nullable: true, onDelete: 'SET NULL' })
  contact?: Contact;

  @OneToMany(() => Activity, (a) => a.deal)
  activities: Activity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
