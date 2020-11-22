import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FetchWeatherResponse} from './weather/weather.component';

@Injectable({
  providedIn: 'root'
})
export class FetchWeatherService {

  constructor(public http: HttpClient) {
  }

  getWeather(latitude: number, longitude: number, key: string): Observable<FetchWeatherResponse> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    return this.http.get<FetchWeatherResponse>(url);
  }
}
