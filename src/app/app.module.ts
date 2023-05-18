import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FloorPipe } from './pipes/floor.pipe';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { WeatherAutoCompleteComponent } from './components/weather-auto-complete/weather-auto-complete.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    FloorPipe,
    FloorPipe,
    WeatherForecastComponent,
    WeatherAutoCompleteComponent,
    CurrentWeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
