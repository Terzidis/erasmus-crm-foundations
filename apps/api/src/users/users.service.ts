import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  list() {
    return [{ id: 'user-1', email: 'user@test.com', role: 'USER' }];
  }

  create(body: any) {
    return { id: 'user-new', ...body };
  }

  get(id: string) {
    return { id, email: 'user@test.com', role: 'USER' };
  }

  update(id: string, body: any) {
    return { id, ...body };
  }

  remove(id: string) {
    return { deleted: true, id };
  }
}
