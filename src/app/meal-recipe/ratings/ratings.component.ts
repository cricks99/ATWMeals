import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/user-profile/interfaces/user';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalService } from 'src/app/local.service';
import { ActivatedRoute } from '@angular/router';
import { UserRepositoryService } from 'src/app/user-profile/user-repository.service';
import { MealRepositoryService } from '../meal-repository.service';
import { ILocalMeal } from '../interfaces/local-meal';
import { IMealDetail } from '../interfaces/mealdetail';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  localMeal: ILocalMeal = {id: 0, mealDBId: 0, name: "", countryId: 0, avgRating: 0,
    country: {id: 0, name: "", flagURL: ""},
    mealRating: {id: 0, rating: 0, mealId: 0, userId: 0, countryName: ""}}

  countryId: number = 0;
  triedMeal: boolean = false;
  selectedRating: number = 0;
  disableButtons: boolean = true;
  createdPassport: boolean = false;
  numRatings: number = 0;

  ctrl = new FormControl<number | null>(null, Validators.required);

  constructor(private userRepo: UserRepositoryService, private mealRepo: MealRepositoryService, private localStore: LocalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //when coming from ingredients search and we don't have a country name
    if (this.countryName === "UNK")
      this.getCountryName();
    else
      this.getCountryIdByName();
    
    this.getUserObject();
    this.getLocalMealByMealDBId();
  }

  toggleRatingSelected() {
    this.disableButtons = !this.disableButtons;
    this.disableButtons ? this.ctrl.enable() : this.ctrl.disable();
  }

  getCountryName() {
    this.mealRepo.getRecipeById(this.mealId).subscribe (
      (response) => {
        this.countryName = response.meals[0].strArea
        this.getCountryIdByName();
      }
    )
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
      (response) => {
        this.localMeal = response;
        this.numRatings = 0;

        for (var rating in this.localMeal.mealRating)
          this.numRatings++;
      }
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

  saveRating(rating: any) {
    if (!this.localMeal)
    this.mealRepo.addLocalMeal(+this.mealId, this.mealName, this.countryId).subscribe (
      (response) => {
        this.mealRepo.addLocalMealRating({id: 0, rating: rating, mealId: response, userId: this.user.id, countryName: ""}).subscribe (
          (response) => {
            if (!this.hasPassport())
              this.userRepo.addPassport(this.user.id, this.countryId).subscribe (
                (response) => {this.createdPassport = true;}
              );

          this.getUserObject();
          this.getLocalMealByMealDBId();
          }
        );
      }
    )

    else
      this.mealRepo.addLocalMealRating({id: 0, rating: rating, mealId: this.localMeal.id, userId: this.user.id, countryName: ""}).subscribe (
        (response) => {
          if (!this.hasPassport())
            this.userRepo.addPassport(this.user.id, this.countryId).subscribe (
              (response) => {this.createdPassport = true;}
            );

          this.getUserObject();
          this.getLocalMealByMealDBId();
        }
      )
    
  }
}
