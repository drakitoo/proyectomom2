import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 habilitar CORS para tu frontend
  app.enableCors({
    origin: 'http://localhost:5173', // dirección del frontend
    methods: 'GET,POST,PATCH,DELETE',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
