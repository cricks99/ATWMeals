import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { RecipeDetailsComponent } from './meal-recipe/recipe-details/recipe-details.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-login/:index', component: UserLoginComponent },
  { path: 'recipe-details/:index', component: RecipeDetailsComponent },
  { path: '', redirectTo: '/home-component', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
