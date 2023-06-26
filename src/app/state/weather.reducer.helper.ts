import {GeneralWeatherResponse, WeatherData, WeatherUI} from "../models/GeneralWeatherResponse";

export class WeatherReducerHelper {


  setSetCurrentCityWeather(draft: WeatherData, payload: GeneralWeatherResponse) {
    draft.currentWeather = payload;
  }

  // setSetCityWeatherForecast(draft: WeatherData, payload: WeatherUI[]) {
  //   draft.weatherForecast = payload;
  // }
  //
  // setSearchCity(draft: WeatherData, payload: string) {
  //   draft.citySearch = {
  //     LocalizedName: payload,
  //     temp: 0,
  //     date: ''
  //   }
  //   // draft.citySearch.LocalizedName = payload;
  // }

  //
  // setChooseCity(draft: WeatherData, payload: string) {
  //   // draft.citySearch.LocalizedName= payload;
  //   draft.citySearch = {
  //     LocalizedName: payload,
  //     temp: 0,
  //     date: ''
  //   }
  // }

  setAddFavoritesCity(draft: WeatherData, payload: string) {
    draft.favoriteCity = payload;
  }


}
