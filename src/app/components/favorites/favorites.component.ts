import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  cities: string[] = [];
  favoritesCities$!: Observable<string[]>
  isFavorites = true

  constructor(private weatherSharedDataService: WeatherSharedDataService) {}

  ngOnInit() {
    this.favoritesCities$ = this.weatherSharedDataService.getFavorites()
  }
}

