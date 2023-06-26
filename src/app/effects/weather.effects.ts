import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {combineLatest, forkJoin, map, mergeMap, switchMap} from "rxjs";
import {WeatherChooseCity, WeatherDataChange, WeatherForecastChange} from "../actions/weather.actions";
import {WeatherApiService} from "../services/weatherApi.service";

@Injectable()
export class WeatherEffects {


  weatherChooseCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherChooseCity),
      switchMap(({payload}) =>
        combineLatest([
          this.weatherService.getWeatherByCityName(payload),
          this.weatherService.getLocationFiveDaysForecast(payload)
        ]).pipe(
          map(([weatherResponse, forecastResponse]) => [
            WeatherDataChange(weatherResponse),
            WeatherForecastChange(forecastResponse)
          ])
        )
      ),
      mergeMap((actions) => actions)
    )
  );


  // weatherChooseCity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeatherChooseCity),
  //     // mergeMap({payload}) =>
  //     mergeMap(({payload}) => {
  //         // debugger;
  //         return this.weatherService.getWeatherByCityName(payload).pipe(
  //           map(response => WeatherDataChange(response))
  //         )
  //       }
  //     ),
  //     mergeMap(({payload}) =>
  //       this.weatherService.getLocationFiveDaysForecast(payload).pipe(
  //         map(response => WeatherForecastChange(response))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherApiService
  ) {
  }
}
