import { NestFactory } from '@nestjs/core';
import { CountriesModule } from './countries/countries.module';

async function bootstrap() {
  const app = await NestFactory.create(CountriesModule);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
