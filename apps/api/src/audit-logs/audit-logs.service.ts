import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLogsService {
  list(limit: number) {
    return Array.from({ length: Math.min(limit, 3) }).map((_, i) => ({
      id: `audit-${i + 1}`,
      tenantId: 'tenant-1',
      userId: 'user-1',
      action: 'users.create',
      resource: 'users',
      resourceId: 'user-new',
      createdAt: new Date().toISOString(),
      metadata: { skeleton: true },
    }));
  }
}
