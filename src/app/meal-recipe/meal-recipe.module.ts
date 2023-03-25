import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RatingsComponent } from './ratings/ratings.component';
import { FormsModule } from '@angular/forms';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { HomeComponent } from '../core/home/home.component';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatIconModule
];

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RatingsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    materialModules
  ],
  exports: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RatingsComponent,
    materialModules
  ]
})
export class MealRecipeModule { }
