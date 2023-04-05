import { Component } from '@angular/core';
import { LocalService } from 'src/app/local.service';
import { ILocalMeal } from 'src/app/meal-recipe/interfaces/local-meal';
import { IUser } from '../interfaces/user';
import { UserRepositoryService } from '../user-repository.service';
import { MealRepositoryService } from 'src/app/meal-recipe/meal-repository.service';
import { FormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

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
    //mealName: string = "";
    mealNames: { [key: number]: string } = {};
    countries: any;
    selectedPassportCountry?: any;
    userRatings: any;
    localMeals: any = [];
    sortedRatings: any;
    selectedPassportMeal?: any = "";
    selectedMealId: number | null = null;
    selectedMealData: string | null = null;
    ctrl = new FormControl<number | null>(null, Validators.required);

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

  // setMealName(mealId: number) {
  //   if (!this.mealNames[mealId]) {
  //     this.mealRepositoryService
  //       .getLocalMealById(mealId.toString())
  //       .subscribe((response) => {
  //         this.mealNames[mealId] = response.name;
  //       });
  //   }
  // }

  // getMealName(mealId: number): string {
  //   return this.mealNames[mealId];
  // }

setMealName(mealId: number) {
  if (!this.mealNames[mealId]) {
    this.mealRepositoryService
      .getLocalMealById(mealId.toString())
      .subscribe((response) => {
        this.mealNames[mealId] = response.name;
      });
  }
}

getMealName(mealId: number): string {
  return this.mealNames[mealId];
}

onMealSelected() {
  if (this.selectedMealId !== null) {
    // Fetch and display data for the selected meal
    this.displayMealData(this.selectedMealId);
  }
}

displayMealData(mealId: number) {
  // Fetch data for the selected meal and update the selectedMealData property
  // For example:
  this.selectedMealData = `Data for meal ID: ${mealId}`;
}

  onSelect(country: any): void {
    this.selectedPassportCountry = country;
  }

  onSelected(meal: any): void {
    this.selectedPassportMeal = meal;
  }

  userMealRating(mealId: number) : number {
    let rating = this.user.mealRatings.find(x => x.mealId === mealId)?.rating;

    return rating && rating > 0 ? rating : 0;
  }
}

