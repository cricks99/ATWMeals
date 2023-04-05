import { Component } from '@angular/core';
import { LocalService } from 'src/app/local.service';
import { MealRepositoryService } from 'src/app/meal-recipe/meal-repository.service';
import { IUser } from '../interfaces/user';
import { UserRepositoryService } from '../user-repository.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  constructor(private localStore: LocalService, private mealService: MealRepositoryService,
    private userRepo: UserRepositoryService) {}

  user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}
  mealNames: { [key: number]: string } = {};

  ngOnInit(): void {
    this.getUserObject();
  }
  getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.userRepo.getUserById(savedUserId).subscribe (
        (response) => {
          this.user = response;
        
          this.user.favorites.forEach(element => {
            this.setMealName(element.mealId)
          });
        });
    }
  }

  setMealName(mealId: number) {
    if (!this.mealNames[mealId]) {
      this.mealService
        .getRecipeById(mealId.toString())
        .subscribe((response) => {
          console.log("here");

          console.log(mealId);
          this.mealNames[mealId] = response.meals[0].strMeal;
        });
    }
  }

  getMealName(mealId: number): string {
    return this.mealNames[mealId];
  }
}
