import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  list() {
    return [
      { id: 'role-admin', name: 'ADMIN' },
      { id: 'role-manager', name: 'MANAGER' },
      { id: 'role-operator', name: 'OPERATOR' },
    ];
  }

  create(name: string) {
    return { id: 'role-new', name };
  }

  get(id: string) {
    return { id, name: 'ADMIN' };
  }
}
