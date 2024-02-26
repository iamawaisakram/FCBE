import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3002', // Replace with the actual origin of your frontend
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
