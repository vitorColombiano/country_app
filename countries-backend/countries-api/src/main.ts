import { NestFactory } from '@nestjs/core';
import { CountriesModule } from './countries/countries.module';

async function bootstrap() {
  const app = await NestFactory.create(CountriesModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
