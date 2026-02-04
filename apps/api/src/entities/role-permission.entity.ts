import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryColumn('uuid')
  roleId: string;

  @PrimaryColumn('uuid')
  permissionId: string;

  @ManyToOne(() => Role, role => role.rolePermissions, { onDelete: 'CASCADE' })
  role: Role;

  @ManyToOne(() => Permission, permission => permission.rolePermissions, { onDelete: 'CASCADE' })
  permission: Permission;
}
