import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PassportComponent } from './passport/passport.component';
import { MealRecipeModule } from '../meal-recipe/meal-recipe.module';



@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    PassportComponent
  ],
  imports: [
    CommonModule,
    MealRecipeModule
  ],
  exports: [
    FavoritesComponent,
    PassportComponent,
    ProfileComponent
  ]
})
export class UserProfileModule { }
