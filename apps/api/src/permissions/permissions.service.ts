import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  list() {
    return [
      { id: 'perm-1', code: 'users.read', description: 'Read users' },
      { id: 'perm-2', code: 'users.write', description: 'Create/update users' },
      { id: 'perm-3', code: 'tenants.manage', description: 'Manage tenants' },
    ];
  }
}
