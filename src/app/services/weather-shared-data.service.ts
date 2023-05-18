import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, switchMap, tap} from "rxjs";
import {GeneralWeatherResponse, List, WeatherUI} from "../models/GeneralWeatherResponse";
import {WeatherApiService} from "./weatherApi.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherSharedDataService {
  locationSearchInput = new FormControl();
  isSearching: boolean = false;
  showSearches: boolean = false;
  searchResult = new BehaviorSubject<string>('');
  locationForecast$!: Observable<WeatherUI[]>;
  cityName!: string;
  dataSubject = new BehaviorSubject<string>("");
  private favoriteCities = new BehaviorSubject<string[]>([])




  constructor(private weatherService: WeatherApiService) {
  }

  addToFavorites(cityName: string) {
    const cities = this.favoriteCities.getValue();
    if(cities.indexOf(cityName) === -1){
      cities.push(cityName);
    }
    this.favoriteCities.next(cities);
  }

  getFavorites() {
    return this.favoriteCities.asObservable();
  }

  getWeatherByCityName(cityName: string): Observable<GeneralWeatherResponse>{
    // this.locationData$ = this.weatherService.getWeatherByCityName(this.cityName);
    return this.weatherService.getWeatherByCityName(cityName)
  }

  getCitySearchResult(cityName: string) {
    this.cityName = cityName;
    console.log(cityName)
    this.dataSubject.next(cityName);
  }


  getLocationSearchAutocomplete() {
    this.locationSearchInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((searchTerm) => searchTerm ? this.weatherService.getAutoCompleteSearch(searchTerm) : []),
      tap(() => {
        this.isSearching = false;
        this.showSearches = true;
      })
    )
      .subscribe(data => {
          if (data.length > 0) {
            const names = data.map(d => d.LocalizedName);
            this.searchResult.next(names[0]);
          }
        }
      )
  }

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
