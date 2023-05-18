import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  cities: string[] = [];
  city: string = '';
  favoritesCities$!: Observable<string[]>

  constructor(private weatherSharedDataService: WeatherSharedDataService) {}

  ngOnInit() {

    this.favoritesCities$ = this.weatherSharedDataService.getFavorites()
    this.weatherSharedDataService.getFavorites().subscribe(cities => {
      this.cities = cities;

      // Save favorites to localStorage
      const favorites = this.cities;
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(JSON.stringify(favorites))

    // Retrieve favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.cities = JSON.parse(storedFavorites);
      console.log(this.cities)
    }
    });
  }

  getCityObservable(city: string): Observable<string> {
    return of(city);
  }
}


