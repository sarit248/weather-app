import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {GeneralWeatherResponse} from "../models/GeneralWeatherResponse";
import {WeatherApiService} from "./weatherApi.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherSharedDataService {
  private favoriteCities = new BehaviorSubject<string[]>([])

  constructor(private weatherService: WeatherApiService) {
    // Retrieve favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if(storedFavorites) {
      this.favoriteCities.next(JSON.parse(storedFavorites));
    }
  }

  addToFavorites(cityName: string) {
    const cities = this.favoriteCities.value;
    if(cities.indexOf(cityName) === -1 ){
      cities.push(cityName);
    }

    localStorage.setItem('favorites', JSON.stringify(cities));
    this.favoriteCities.next(cities);
  }

  getFavorites() {
    return this.favoriteCities.asObservable();
  }

  getCityNameWeather(cityName: string): Observable<GeneralWeatherResponse>{
    return this.weatherService.getWeatherByCityName(cityName)
  }
}
