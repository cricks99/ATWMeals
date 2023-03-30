import { Component } from '@angular/core';
import { LocalService } from 'src/app/local.service';
import { ILocalMeal } from 'src/app/meal-recipe/interfaces/local-meal';
import { IUser } from '../interfaces/user';
import { UserRepositoryService } from '../user-repository.service';
import { MealRepositoryService } from 'src/app/meal-recipe/meal-repository.service';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent {

  constructor(private repositoryService: UserRepositoryService, private mealRepositoryService: MealRepositoryService, private localStore: LocalService,
    private userRepo: UserRepositoryService) {}

    userPassportRatings: IUser | undefined;
    user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}
    mealName: string = "";
    countries: any;
    selectedPassportCountry?: any;
    userRatings: any;
    localMeals: any = [];
    sortedRatings: any;

    getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.userRepo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});
    }
  }

  ngOnInit(): void {
    this.getUserObject();
  }

  totalUserCountryCount(): number {
    return this.user.passports.length
  }


  
  setMealName(mealId: string): number {
    this.mealRepositoryService.getLocalMealById(mealId).subscribe(
      (response) =>
      {
        this.mealName = response.name;
      }
    )
    //this.mealName = "test";
    return 1;
  }

  onSelect(country: any): void {
    this.selectedPassportCountry = country;
  }

}

