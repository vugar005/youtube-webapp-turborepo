import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryCodeDTO } from '../../models';
import { APP_CONFIG } from '../../tokens';
import { GEO_API_BASE_URL } from './country-api.constants';

@Injectable({ providedIn: 'root' })
export class CountryApiService {
  constructor(@Inject(APP_CONFIG) private readonly appConfig: any, private http: HttpClient) {}

  public getCountryCode(): Observable<string> {
    const apiKey = this.appConfig.geoApiKey;
    const url = `${GEO_API_BASE_URL}/ipinfo?apiKey=${apiKey}`;
    return this.http.get<CountryCodeDTO>(url).pipe(map((res: CountryCodeDTO) => res?.country?.iso_code));
  }
}
