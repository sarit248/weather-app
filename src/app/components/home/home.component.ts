import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BehaviorSubject, filter, map, Observable, Subscription, tap} from "rxjs";
import {GeneralWeatherResponse, WeatherUI} from "../../models/GeneralWeatherResponse";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";
import {WeatherApiService} from "../../services/weatherApi.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locationData$!: Observable<GeneralWeatherResponse>;
  cityName!: string;
  dataSubject = new BehaviorSubject<string>("tel-aviv" || '');

  constructor(private weatherService: WeatherApiService, private  weatherShareDataService: WeatherSharedDataService) {
  }


  ngOnInit() {
    localStorage.setItem('currentCity', (this.cityName));
    // Retrieve favorites from localStorage
    const storedCurrenCity = localStorage.getItem('currentCity');
    if (storedCurrenCity) {
      this.cityName = (storedCurrenCity);
    }
  }


  getCitySearchResult(cityName: string) {
    this.cityName = cityName;
    console.log(cityName)
    this.dataSubject.next(cityName);
  }


  addToFavorites() {
    this.weatherShareDataService.addToFavorites(this.cityName);
  }
}
