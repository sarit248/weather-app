import {createAction, props} from '@ngrx/store';
import {GeneralForecastResponse, GeneralWeatherResponse, WeatherUI} from "../models/GeneralWeatherResponse";
import {WeatherActionTypes} from "./waetherActionTypes";


// export const WeatherSearchCity = createAction(WeatherActionTypes.WeatherSearchCity, (payload: string | any) => payload);
// export const WeatherChooseCity = createAction(WeatherActionTypes.WeatherChooseCity, (payload: string | any) => payload);
export const WeatherChooseCity = createAction(WeatherActionTypes.WeatherChooseCity, props<{ payload: string }>());
export const WeatherDataChange = createAction(WeatherActionTypes.WeatherDataChange, (payload: GeneralWeatherResponse) => payload);
export const WeatherForecastChange = createAction(WeatherActionTypes.WeatherForecast, (payload: GeneralForecastResponse) => payload);
export const WeatherAddToFavorites = createAction(WeatherActionTypes.WeatherAddToFavorites, (payload: string | any) => payload);


// app init -> WeatherCooceCity Action ->
// Reducer to update name
// Effect -> server -> weather -> Action -> Reducer -> State


