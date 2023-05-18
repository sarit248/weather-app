import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ElementRef, Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {GeneralWeatherResponse, List, LocationInfo} from "../models/GeneralWeatherResponse";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  key = '18b9a5660b6dc23b7f70bd26f04bd803';
  apiKey = 'mcWiAQe14iAdmq4IOvPHfUTo0Mk89pHt'
  baseUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';
  baseUrlFiveDaysForecast = 'https://api.openweathermap.org/data/2.5/forecast?&units=metric';
  autoCompleteKey = 'e67eccaa3355441e930141117230405';
  // autocompleteUrl = 'https://api.weatherapi.com/v1/search.json';
  autocompleteUrl = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';


  constructor(private http: HttpClient) {
  }

  getWeatherByCityName(location: string) {
    return this.http.get<GeneralWeatherResponse>(`${this.baseUrl}&appid=${this.key}&q=${location}`)
  }

  getLocationFiveDaysForecast(location: string) {
    return this.http.get<GeneralWeatherResponse>(`${this.baseUrlFiveDaysForecast}&appid=${this.key}&q=${location}`)
  }

  getAutoCompleteSearch(location: string) {
    return this.http.get<LocationInfo[]>(`${this.autocompleteUrl}?apikey=${this.apiKey}&q=${location}`)
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
