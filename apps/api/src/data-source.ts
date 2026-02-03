import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { Contact } from './entities/contact.entity';
import { Deal } from './entities/deal.entity';
import { Activity } from './entities/activity.entity';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

// ✅ Migrations pattern that works both in TS (local) and JS (Railway build/dist)
const migrationsGlob =
  __filename.endsWith('.ts') ? 'src/migrations/*.ts' : 'dist/migrations/*.js';

export const AppDataSource = new DataSource({
  type: 'postgres',

  ...(databaseUrl
    ? {
        // Railway / production
        url: databaseUrl,
        ssl: { rejectUnauthorized: false },
      }
    : {
        // Local dev
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),

  entities: [User, Company, Contact, Deal, Activity],
  migrations: [migrationsGlob],
});
