import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantsService {
  list() {
    return [{ id: 'tenant-1', name: 'Skeleton Mall' }];
  }

  create(name: string) {
    return { id: 'tenant-new', name };
  }

  get(id: string) {
    return { id, name: 'Skeleton Mall' };
  }

  update(id: string, body: { name?: string }) {
    return { id, ...body };
  }
}
