import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { HttpService } from '@nestjs/axios';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly httpService: HttpService, // Injetando o HttpService para fazer requisição externa
  ) {}

  @Get()
  async getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }

  @Get('info')
  async getCountryInfo(@Query('code') code: string) {
    if (!code) {
      throw new Error('Country code is required');
    }
    return this.countriesService.getCountryInfo(code);
  }
}
