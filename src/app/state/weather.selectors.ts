import {createSelector} from "@ngrx/store";
import {WeatherData} from "../models/GeneralWeatherResponse";

export const selectCitySearch = createSelector((state: WeatherData) => state.citySearch, citySearch => citySearch);

//
// export const selectFeature = (state: WeatherData) => state.citySearch;
//
// export const selectFeatureCount = createSelector(
//   selectFeature,
//   (state: WeatherData) => state.citySearch
// );
// export const selectCitySearch = createSelector(
//   (state: ) => state.citySearch,
//   (citySearch: String) => citySearch);
