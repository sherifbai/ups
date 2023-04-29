import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "@app/app.module";
import { AppConfig } from "@app/common/config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  const swagger = new DocumentBuilder()
    .setTitle('UPS')
    .setDescription('Simple user post service')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('docs', app, document);

  const config = app.get(ConfigService<AppConfig>);
  const port = config.get('port') ?? 3000;

  await app.listen(port);
}
bootstrap();
