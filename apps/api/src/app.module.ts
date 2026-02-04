import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tenant } from './entities/tenant.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Session } from './entities/session.entity';
import { AuditLog } from './entities/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');

        return databaseUrl
          ? {
              type: 'postgres',
              url: databaseUrl,
              ssl: { rejectUnauthorized: false },
              autoLoadEntities: true,
              synchronize: false,
            }
          : {
              type: 'postgres',
              host: config.get('DB_HOST'),
              port: Number(config.get('DB_PORT')),
              username: config.get('DB_USERNAME'),
              password: config.get('DB_PASSWORD'),
              database: config.get('DB_NAME'),
              autoLoadEntities: true,
              synchronize: false,
            };
      },
    }),

    TypeOrmModule.forFeature([
      Tenant,
      User,
      Role,
      Permission,
      RolePermission,
      Session,
      AuditLog,
    ]),
  ],
})
export class AppModule {}
