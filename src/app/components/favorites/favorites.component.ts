import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  cities: string[] = [];
  city: string = '';
  @Input() data!: Observable<string>;

  constructor(private weatherSharedDataService: WeatherSharedDataService) {}

  ngOnInit() {
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
}


