import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { MealRecipeModule } from "../meal-recipe/meal-recipe.module";


@NgModule({
    declarations: [
        PageNotFoundComponent,
        //HomeComponent
    ],
    exports: [
        PageNotFoundComponent,
        //HomeComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule { }
