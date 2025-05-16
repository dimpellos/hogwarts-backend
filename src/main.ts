import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Allow React/Next.js frontend on port 3001
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  // 🔐 Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // 📘 Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Hogwarts API')
    .setDescription('API to manage Hogwarts Houses')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // available at /api

  // Use process.env.PORT for Render deployment
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
