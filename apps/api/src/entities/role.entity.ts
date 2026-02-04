import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Tenant } from './tenant.entity';
import { User } from './user.entity';
import { RolePermission } from './role-permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Tenant, tenant => tenant.roles, { nullable: true })
  tenant: Tenant;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @OneToMany(() => RolePermission, rp => rp.role)
  rolePermissions: RolePermission[];
}
