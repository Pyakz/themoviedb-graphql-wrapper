import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = parseInt(process.env.PORT) || 8080;
  console.log('Running: ', PORT);
  await app.listen(PORT);
}
bootstrap();
