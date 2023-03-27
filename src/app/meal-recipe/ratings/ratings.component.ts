import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/user-profile/interfaces/user';
import { NgForm } from '@angular/forms';
import { LocalService } from 'src/app/local.service';
import { ActivatedRoute } from '@angular/router';
import { UserRepositoryService } from 'src/app/user-profile/user-repository.service';
import { MealRepositoryService } from '../meal-repository.service';
import { ILocalMeal } from '../interfaces/local-meal';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent {

  @Input() countryName: string = "";
  @Input() mealId: string = "";
  @Input() mealName: string = "";
  
  user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}
  localMeal!: ILocalMeal;
  countryId: number = 0;
  triedMeal: boolean = false;

  constructor(private userRepo: UserRepositoryService, private mealRepo: MealRepositoryService, private localStore: LocalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserObject();
    this.getCountryIdByName();
    this.getLocalMealByMealDBId();
  }

  getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0)
      this.userRepo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});
  }

  getCountryIdByName() {
      this.mealRepo.getCountryIdByName(this.countryName).subscribe (
        (response) => {this.countryId = response}
      )
  }

  getLocalMealByMealDBId() {
    this.mealRepo.getLocalMealByMealDBId(this.mealId).subscribe (
      (response) => {this.localMeal = response}
    )
}

  userMealRating() : number {
    if (!this.localMeal)
      return 0;

    let rating = this.user.mealRatings.find(x => x.userId === this.user.id && x.mealId === this.localMeal.id)?.rating;

    return rating && rating > 0 ? rating : 0;
  }

  hasPassport(): boolean {
    return this.user.passports.some(x => x.userId === this.user.id && x.countryId === this.countryId);
  }

  triedThisMeal() {
    this.triedMeal = true;
  }
}
