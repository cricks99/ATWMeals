import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RatingsComponent } from './ratings/ratings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../core/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    AppRoutingModule,
    materialModules,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    RecipeListComponent,
    RecipeDetailsComponent,
    materialModules
  ]
})
export class MealRecipeModule { }
