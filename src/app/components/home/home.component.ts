import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {BehaviorSubject, delay, map, Observable, switchMap, takeUntil} from "rxjs";
import {
  WeatherAddToFavorites,
  WeatherChooseCity,
  WeatherForecastChange,
  WeatherDataChange
} from "../../actions/weather.actions";
import {GeneralWeatherResponse, WeatherData, WeatherUI} from "../../models/GeneralWeatherResponse";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";
import {WeatherApiService} from "../../services/weatherApi.service";
import {selectCitySearch} from "../../state/weather.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locationData$!: Observable<GeneralWeatherResponse>;
  // citySubject = new BehaviorSubject<string>("Tel Aviv");
  isFavorites = false;
  favorites!: string[]

  // generalWeather$: Observable<GeneralWeatherResponse>;
  // public citySearch$!: Observable<string>;
  public citySearch$ = this.store.select(selectCitySearch);

  public locationForecast$!: Observable<WeatherUI[]>;

  constructor(private route: ActivatedRoute, private weatherSharedDataService: WeatherSharedDataService, private weatherService: WeatherApiService, private weatherShareDataService: WeatherSharedDataService, private router: Router, public store: Store<WeatherData>) {
    this.setLocationForecast();

    // this.generalWeather$ = this.route.params.pipe(switchMap(params => this.weatherShareDataService.getCityNameWeather(params.toString())));
    // this.generalWeather$.subscribe((r) => {
    //   console.log(r);
    // });
    this.initSelectors();
  }


  initSelectors() {
    // this.citySearch$ = this.store.select('citySearch');
    // this.locationForecast$ = this.store.select('weatherForecast');
    this.citySearch$.subscribe(r => console.log(r));
    this.locationForecast$ = this.store.select(s => s.weatherForecast);
    this.store.select(s => s.citySearch).subscribe(x => console.log(x))
    this.store.select(s => s.weatherForecast).subscribe(x => console.log(x))

    this.store.dispatch(WeatherChooseCity({payload: "hey"}));

    // this.citySearch$.subscribe(r => {
    //   console.log("test" + r);
    // })
  }

  //
  // setInitLocation() {
  //
  //   /*    this.weatherSharedDataService.getCityNameWeather(this.citySubject.value).subscribe((data => {
  //         // this.locationData = data
  //         this.store.dispatch(WeatherInit(data));
  //       }));*/
  // }

  setLocationForecast() {
    // this.weatherSharedDataService.getCityNameWeather(this.citySubject.value).subscribe((data => {
    // this.locationData = data
    // this.weatherService
    //   .getLocationFiveDaysForecast(this.citySubject.value)
    //   .pipe(
    //     map(data => data.list.filter((item: any) => {
    //       const itemDate = new Date(item.dt_txt);
    //       return itemDate.getHours() === 12
    //     }).map((day: List) => ({
    //           date: new Date(day.dt_txt).toLocaleDateString(),
    //           temp: day.main.temp
    //         } as WeatherUI
    //       )
    //     ))).subscribe((data => {
    //   this.store.dispatch(WeatherForecastChange(data));
    // }));
  };


  // TODO
  // 2 - why there is no update in the ui

  ngOnInit() {
    // Retrieve favorites from localStorage
    const storedCurrenCity = localStorage.getItem('currentCity');
    if (storedCurrenCity) {
      this.setCitySearchResult(storedCurrenCity);
    } else {
      this.setCitySearchResult("Tel Aviv");
    }
  }

  setCitySearchResult(cityName: string) {
    localStorage.setItem('currentCity', cityName);
    // this.citySubject.next(cityName);
    this.store.dispatch(WeatherChooseCity({payload: cityName}));
  }

  addToFavorites() {
    // const currentCity = this.citySubject.value;
    // this.weatherSharedDataService.addToFavorites(currentCity)

    this.weatherSharedDataService.getFavorites().subscribe(data => this.favorites = data)
    // this.weatherSharedDataService.getFavorites().subscribe(data => {
    //   this.store.dispatch(WeatherAddToFavorites(data));
    // })
    this.store.dispatch(WeatherAddToFavorites(this.favorites))
  }
}
