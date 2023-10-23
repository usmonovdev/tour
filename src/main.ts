import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { initializeFirebaseApp } from './config/firebase.config';
initializeFirebaseApp();

async function runApp() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('NestJS')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, sequelize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    await app.listen(PORT, () => {
      console.log('Server listening on port', +PORT);
    });
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
runApp();
