import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

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
        const url = config.get<string>('DATABASE_URL');

        // Railway / production (DATABASE_URL)
        if (url) {
          return {
            type: 'postgres' as const,
            url,
            entities: [User, Company, Contact, Deal, Activity],
            synchronize: false,

            // Railway Postgres often requires SSL
            ssl: { rejectUnauthorized: false },

            // keep logs on for now; later you can set to false in prod
            logging: true,
          };
        }

        // Local dev (DB_HOST/DB_...)
        return {
          type: 'postgres' as const,
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT') || 5432),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),

          entities: [Tenant,User,Role,Permission,RolePermission,Session,AuditLog],
          synchronize: false,
          logging: true,
        };
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
