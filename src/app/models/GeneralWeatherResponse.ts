export interface WeatherUI {
  date: string;
  temp: number;
  LocalizedName: string;
}

export interface GeneralWeatherResponse {
  coord:      Coord;
  weather:    Weather[];
  base:       string;
  main:       Main;
  visibility: number;
  wind:       Wind;
  clouds:     Clouds;
  dt:         number;
  sys:        Sys;
  timezone:   number;
  id:         number;
  name:       string;
  cod:        number;
  list:    List[];
}

export interface List {
  dt:         number;
  main:       MainClass;
  weather:    Weather[];
  clouds:     Clouds;
  wind:       Wind;
  visibility: number;
  pop:        number;
  sys:        Sys;
  dt_txt:     Date;
  date:       Date;
  temperature: number;
}

export interface MainClass {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  sea_level:  number;
  grnd_level: number;
  humidity:   number;
  temp_kf:    number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
}

export interface Sys {
  type:    number;
  id:      number;
  country: string;
  sunrise: number;
  sunset:  number;
}

export interface Weather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface Wind {
  speed: number;
  deg:   number;
}

export interface LocationInfo {
  Version:            number;
  Key:                string;
  Type:               string;
  Rank:               number;
  LocalizedName:      string;
  Country:            AdministrativeArea;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  ID:            string;
  LocalizedName: string;
}

