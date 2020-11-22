import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FetchWeatherService} from '../fetch-weather.service';
import {ConnectionService} from 'ng-connection-service';
import {ConnectionDialogComponent} from '../app.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnChanges {

  KELVIN = 273;
  key = 'c87bad92a901b0375f3f4b3386df4058';
  latitude = 0;
  longitude = 0;
  weather = {
    temperature: 0,
    description: '',
    iconId: 'unknown',
    city: '',
    country: ''
  };
  @Input() updateWeather: any;

  constructor(public fetchWeatherService: FetchWeatherService,
              private connectionService: ConnectionService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.getLocation();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.updateWeather.currentValue) {
      this.connectionService.monitor().subscribe(isConnected => {
        if (isConnected) {
          this.getLocation();
        }
      });
    }
  }

  public getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.fetchWeatherData();
          }
        },
        (error: PositionError) => alert(error.message));
    } else {
      this.openDialog('Geolocation is not supported by this browser.');
    }
  }

  public fetchWeatherData(): void {

    this.fetchWeatherService.getWeather(this.latitude, this.longitude, this.key).subscribe(response => {
      this.weather.temperature = Math.floor(response.main.temp - this.KELVIN);
      this.weather.description = response.weather[0].description;
      this.weather.iconId = response.weather[0].icon;
      this.weather.city = response.name;
      this.weather.country = response.sys.country;
    }, error => {
      this.openDialog('Unable to fetch weather data.');
    });
  }

  public openDialog(message: string): void {
    const dialogRef = this.dialog.open(ConnectionDialogComponent, {
      width: '250px',
      data: {message}
    });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 5000);
  }


}

export interface FetchWeatherResponse {
  coord: {
    lon: number,
    lat: number
  };
  weather: [{ id: number, 'main': string, 'description': string, 'icon': string }];
  base: string;
  'main': {
    'temp': number, 'feels_like': number, 'temp_min': number,
    'temp_max': number, 'pressure': number, 'humidity': number
  };
  'visibility': number;
  'wind': { 'speed': number, 'deg': number };
  'clouds': { 'all': number };
  'dt': number;
  'sys': { 'type': number, 'id': number, 'country': string, 'sunrise': number, 'sunset': number };
  'timezone': number;
  'id': number;
  'name': string;
  'cod': number;

}
