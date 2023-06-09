import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MealRecipeModule } from './meal-recipe/meal-recipe.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileModule } from './user-profile/user-profile.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserProfileModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  exports: [
    UserLoginComponent,
    AboutUsComponent,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
