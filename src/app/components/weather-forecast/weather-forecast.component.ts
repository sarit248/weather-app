import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {List, WeatherUI} from "../../models/GeneralWeatherResponse";
import {WeatherApiService} from "../../services/weatherApi.service";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  locationForecast$!: Observable<WeatherUI[]>;
  @Input() cityName!: string;
  @Input() city!: Observable<string>;

  constructor(private weatherService: WeatherApiService) {
  }

  ngOnInit() {
    this.city?.subscribe(cityName => {
      this.cityName = cityName;
      this.getLocationForecast();
      console.log("weather-forecast city:" + cityName);
    });

    // localStorage.setItem('currentCity', JSON.stringify(this.cityName));
    // // Retrieve favorites from localStorage
    // const storedCurrenCity = localStorage.getItem('currentCity');
    // if (storedCurrenCity) {
    //   this.cityName = JSON.parse(storedCurrenCity);
    //   console.log(this.cityName)
    // }
    localStorage.setItem('currentCity', (this.cityName));
    // Retrieve favorites from localStorage
    const storedCurrenCity = localStorage.getItem('currentCity');
    if (storedCurrenCity) {
      this.cityName = (storedCurrenCity);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    localStorage.setItem('currentCity', (this.cityName));
    // Retrieve favorites from localStorage
    const storedCurrenCity = localStorage.getItem('currentCity');
    if (storedCurrenCity) {
      this.cityName = (storedCurrenCity);
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(this.cityName)
  //   if (changes['cityName'] && !changes['cityName'].firstChange) {
  //     this.getLocationForecast();
  //   }
  // }


  getLocationForecast() {
    this.locationForecast$ = this.weatherService
      .getLocationFiveDaysForecast(this.cityName)
      .pipe(
        map(data => data.list.filter((item: any) => {
          const itemDate = new Date(item.dt_txt);
          return itemDate.getHours() === 12
        }).map((day: List) => {
            return {
              date: new Date(day.dt_txt).toLocaleDateString(),
              temp: day.main.temp
            } as WeatherUI
          }
        )));
  }
}

