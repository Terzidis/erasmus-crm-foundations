import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

// Core modules
import { AuthModule } from './auth/auth.module';

// Feature modules
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';

@Module({
  imports: [
    // Global env config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database
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

    // App modules
    AuthModule,
    TenantsModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
