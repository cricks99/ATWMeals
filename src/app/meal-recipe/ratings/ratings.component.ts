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
  localMeal: ILocalMeal = {id: 0, mealDBId: 0, name: "", countryId: 0, avgRating: 0,
    country: {id: 0, name: "", flagURL: ""},
    mealRating: {id: 0, rating: 0, mealId: 0, userId: 0}}

  countryId: number = 0;
  triedMeal: boolean = false;
  selectedRating: number = 0;

  // form = new FormGroup({
  //   formRating: new FormControl('', Validators.required)
  // });

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

  newRating(form: NgForm) {
    let rating = form.value.rating;

    if (!this.localMeal)
    this.mealRepo.addLocalMeal(+this.mealId, this.mealName, this.countryId).subscribe (
      (response) => {
        this.mealRepo.addLocalMealRating({id: 0, rating: rating, mealId: response, userId: this.user.id}).subscribe (
          (response) => {
            if (!this.hasPassport())
            this.userRepo.addPassport(this.user.id, this.countryId).subscribe (
              (response) => {}
            );

          this.getUserObject();
          this.getLocalMealByMealDBId();
          }
        );
      }
    )

    else
      this.mealRepo.addLocalMealRating({id: 0, rating: rating, mealId: this.localMeal.id, userId: this.user.id}).subscribe (
        (response) => {
          if (!this.hasPassport())
            this.userRepo.addPassport(this.user.id, this.countryId).subscribe (
              (response) => {}
            );

          this.getUserObject();
          this.getLocalMealByMealDBId();
        }
      )
    
  }
}
