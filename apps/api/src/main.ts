import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: (config.get<string>('CORS_ORIGIN') || 'http://localhost:5173')
      .split(',')
      .map((s) => s.trim()),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Erasmus CRM API')
    .setDescription('Foundation API for CRM')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // ✅ IMPORTANT: with global prefix 'api', use 'docs' (NOT 'api/docs')
  SwaggerModule.setup('docs', app, document);

  const port = Number(config.get('PORT') || 3000);
  await app.listen(port);
}
bootstrap();
