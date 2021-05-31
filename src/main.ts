import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SanitizationPipe } from './pipes/sanitization.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(
    new SanitizationPipe({
      transform: true,
    }),
    new ValidationPipe(),
  );
  await app.listen(configService.get<number>('port'));
}
bootstrap();
