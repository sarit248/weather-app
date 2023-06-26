import {createReducer, on} from "@ngrx/store";
import {
  WeatherAddToFavorites,
  WeatherChooseCity,
  WeatherForecastChange,
  WeatherDataChange,
} from "../actions/weather.actions";
import {
  GeneralForecastResponse,
  GeneralWeatherResponse,
  WeatherData,
  WeatherUI
} from "../models/GeneralWeatherResponse";
import {WeatherReducerHelper} from "./weather.reducer.helper";

export const initialState: WeatherData = {
  currentWeather: undefined,
  favoriteCity: '',
  weatherForecast: [],
  citySearch: "Tel Aviv"
};

const helper = new WeatherReducerHelper();


export const weatherReducer = createReducer(
    initialState,
    on(WeatherDataChange, (state, payload) => (
      {
        ...state,
        currentWeather: payload
      }
    )),

    on(WeatherForecastChange, (state, payload) => (
      {
        ...state,
        weatherForecast: payload.list.filter((item: any) => {
          const itemDate = new Date(item.dt_txt);
          return itemDate.getHours() === 12
        }).map((day) => ({
              date: new Date(day.dt_txt).toLocaleDateString(),
              temp: day.main.temp
            } as WeatherUI
          )
        )
      }
    )),
    // on(WeatherSearchCity, (state, payload) => (
    //   {
    //     ...state,
    //     citySearch: payload
    //   }
    // )),

    on(WeatherChooseCity, (state, {payload}) => {

      state = {...state, citySearch: payload};
      return Object.assign({}, state);
    }),
// (
//     {
//       ...state,
//       citySearch: payload
//     }
//   )
// }),

    on(WeatherAddToFavorites, (state, payload) => (
      {
        ...state,
        favoriteCity: payload
      }
    ))
  )
;


// export function weatherReducer2(draft = initialState, action: any) {
//   switch (action.type) {
//     case WeatherActionTypes.WeatherInit:
//       return helper.setSetCurrentCityWeather(draft, action.payload);
//     case WeatherActionTypes.WeatherSearchCity:
//       return helper.setSearchCity(draft, action.payload);
//     case WeatherActionTypes.WeatherChooseCity:
//       return helper.setChooseCity(draft, action.payload);
//     case WeatherActionTypes.WeatherForecast:
//       return helper.setSetCityWeatherForecast(draft, action.payload);
//     case WeatherActionTypes.WeatherAddToFavorites:
//       return helper.setAddFavoritesCity(draft, action.payload);
//     default:
//       return draft;
//   }
// }
