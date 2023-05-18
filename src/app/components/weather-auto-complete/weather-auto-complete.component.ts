import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  tap
} from "rxjs";
import {LocationInfo} from "../../models/GeneralWeatherResponse";
import {WeatherApiService} from "../../services/weatherApi.service";



@Component({
  selector: 'app-weather-auto-complete',
  templateUrl: './weather-auto-complete.component.html',
  styleUrls: ['./weather-auto-complete.component.scss']
})
export class WeatherAutoCompleteComponent implements OnInit {
  isSearching: boolean = false;
  locationSearchInput = new FormControl();
  showSearches: boolean = false;
  citiesName!: string[];
  @Output() searchResult = new EventEmitter<string>;

  constructor(private weatherService: WeatherApiService) {
  }

  ngOnInit() {
    this.locationSearch()
  }

  locationSearch() {
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
            this.citiesName = data.map(d => d.LocalizedName);
            this.searchResult.emit(this.citiesName[0]);
          }
        }
      )
  }
}

