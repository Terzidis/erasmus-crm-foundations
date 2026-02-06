import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  // -------- Roles --------

  list() {
    return [
      { id: 'role-admin', name: 'ADMIN' },
      { id: 'role-manager', name: 'MANAGER' },
      { id: 'role-operator', name: 'OPERATOR' },
    ];
  }

  create(name: string) {
    return {
      id: 'role-new',
      name,
    };
  }

  get(id: string) {
    return {
      id,
      name: 'ADMIN',
    };
  }

  // -------- Role Permissions --------

  listPermissions(roleId: string) {
    return [
      {
        roleId,
        permissionId: 'users.read',
      },
      {
        roleId,
        permissionId: 'users.create',
      },
    ];
  }

  assignPermission(roleId: string, permissionId: string) {
    return {
      roleId,
      permissionId,
      assigned: true,
    };
  }

  removePermission(roleId: string, permissionId: string) {
    return {
      roleId,
      permissionId,
      removed: true,
    };
  }
}
