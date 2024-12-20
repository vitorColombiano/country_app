import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  providers: [CountriesService],
  controllers: [CountriesController],
  imports: [HttpModule],
})
export class CountriesModule {}
