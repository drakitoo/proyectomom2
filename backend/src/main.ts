import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Middleware para limpiar saltos de línea en la URL (tanto encoded como literal)
  app.use((req, res, next) => {
    // Limpiar %0A, %0D, \n, \r
    req.url = req.url.replace(/%0A|%0D|%0a|%0d|\n|\r/g, '');
    req.originalUrl = req.originalUrl.replace(/%0A|%0D|%0a|%0d|\n|\r/g, '');
    console.log(`📨 ${req.method} ${req.path}`);
    next();
  });

  // 🔹 habilitar CORS para tu frontend
  app.enableCors({
    origin: 'http://localhost:5173', // dirección del frontend
    methods: 'GET,POST,PATCH,DELETE',
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`Backend escuchando en http://localhost:${port}`);
}
bootstrap();
