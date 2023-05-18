import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: HomeComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
