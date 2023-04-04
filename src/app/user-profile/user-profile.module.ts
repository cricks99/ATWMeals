import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PassportComponent } from './passport/passport.component';
import { MealRecipeModule } from '../meal-recipe/meal-recipe.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const materialModules = [
  MatIconModule
];

@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    PassportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    materialModules,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    FavoritesComponent,
    PassportComponent,
    ProfileComponent
  ]
})
export class UserProfileModule { }
