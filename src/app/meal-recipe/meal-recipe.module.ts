import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RatingsComponent } from './ratings/ratings.component';
import { UserProfileModule } from '../user-profile/user-profile.module';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RatingsComponent
  ],
  imports: [
    CommonModule,
    UserProfileModule
  ],
  exports: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RatingsComponent
  ]
})
export class MealRecipeModule { }
