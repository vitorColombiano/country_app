import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    const response = await lastValueFrom(
      this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'),
    );
    return response.data;
  }

  async getCountryInfo(code: string) {
    try {
      const countryInfo = await lastValueFrom(
        this.httpService.get(
          `https://date.nager.at/api/v3/CountryInfo/${code}`,
        ),
      );

      const populationData = await lastValueFrom(
        this.httpService.post(
          'https://countriesnow.space/api/v0.1/countries/population',
          {
            country: countryInfo.data.commonName,
          },
        ),
      );

      const flagData = await lastValueFrom(
        this.httpService.post(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
          {
            iso2: code,
          },
        ),
      );

      return {
        countryName: countryInfo.data.commonName,
        flagUrl: flagData.data.data.flag,
        borderCountries: countryInfo.data.borders.map(
          (border) => border.commonName,
        ),
        populationData: populationData.data.data.populationCounts,
      };
    } catch (error) {
      console.error('Error to find informations for country:', error.message);
      throw new Error(`Error to find informations for country: ${code}`);
    }
  }
}
