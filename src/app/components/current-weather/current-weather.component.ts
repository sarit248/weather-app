import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {GeneralWeatherResponse} from "../../models/GeneralWeatherResponse";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnDestroy{
  locationData$!: Observable<GeneralWeatherResponse>;
  ngUnsubscribe = new Subject();
  private _cityName: string = "";
  locationData!: GeneralWeatherResponse;


  @Input()
  set city(city: string) {
    this._cityName = city;
    // this.updateLocationData();
  }

  get city(): string {
    return this._cityName
  }
  @Input() isFavorites!: boolean;

  constructor(private weatherSharedDataService: WeatherSharedDataService, private router: Router) {
  }


  // updateLocationData() {
  //   this.weatherSharedDataService.getCityNameWeather(this.city).pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(data => this.locationData = data)
  // };


  ngOnDestroy(): void {
    this.ngUnsubscribe.next(0);
    this.ngUnsubscribe.complete();
  }
}
