import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecipeListComponent,
    RecipeDetailsComponent
  ]
})
export class MealRecipeModule { }
