import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMealDetail } from '../interfaces/mealdetail';
import { INutrition } from '../interfaces/nutrition';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  //@Input() mealId: string = "52772";
choiceMeal: IMealDetail | undefined;

mealId: string = "";
mealName: string = "";
countryName: string = "";

nutritions1:  any = "";
nutritions2: INutrition | any;

ingredients: string = "";


constructor(private repositoryService: MealRepositoryService, private route: ActivatedRoute) {}

ngOnInit(): void {
  this.mealId = this.route.snapshot.params['mealId'];
  this.countryName = this.route.snapshot.params['countryName'];
  this.mealName = this.route.snapshot.params['mealName'];

  
  

  this.repositoryService.getRecipeById(this.mealId).subscribe(
    (response) => {
      this.choiceMeal = response;
    
      this.ingredients = this.choiceMeal.meals[0].strMeasure1 + " " + this.choiceMeal.meals[0].strIngredient1 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure2 + " " + this.choiceMeal.meals[0].strIngredient2 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure3 + " " + this.choiceMeal.meals[0].strIngredient3 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure4 + " " + this.choiceMeal.meals[0].strIngredient4 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure5 + " " + this.choiceMeal.meals[0].strIngredient5 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure6 + " " + this.choiceMeal.meals[0].strIngredient6 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure7 + " " + this.choiceMeal.meals[0].strIngredient7 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure8 + " " + this.choiceMeal.meals[0].strIngredient8 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure9 + " " + this.choiceMeal.meals[0].strIngredient9 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure10 + " " + this.choiceMeal.meals[0].strIngredient10 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure11 + " " + this.choiceMeal.meals[0].strIngredient11 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure12 + " " + this.choiceMeal.meals[0].strIngredient12 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure13 + " " + this.choiceMeal.meals[0].strIngredient13 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure14 + " " + this.choiceMeal.meals[0].strIngredient14 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure15 + " " + this.choiceMeal.meals[0].strIngredient15 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure16 + " " + this.choiceMeal.meals[0].strIngredient16 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure17 + " " + this.choiceMeal.meals[0].strIngredient17 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure18 + " " + this.choiceMeal.meals[0].strIngredient18 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure19 + " " + this.choiceMeal.meals[0].strIngredient19 + ", ";
      this.ingredients += this.choiceMeal.meals[0].strMeasure20 + " " + this.choiceMeal.meals[0].strIngredient20;
      
       // does a call to get nutrition information
      this.repositoryService.getNutrition(this.ingredients).subscribe(
      (response) => {this.nutritions = response;}


  //create an array with 2 strings
  //strIngredient1 and strMeasure1
  //strIngredient2 and strMeasure2
  //strIngredient3 and strMeasure3
  //etc.

  //then loop through array to create a single string in this.ingredients
  //this.ingredients = strMeasure1 + " " + strIngreident1 + ", " +
  //  strMeasure2 + " " + strIngreident3 + ", " +
  //  strMeasure3 + " " + strIngreident3 + ", "
  //etc.

    
  )

    }
  )


 
}

getNutrition(ingredient: string){

  

}


getIngredients(): void{
 let getingredient: string[] = [];

  getingredient.push('apple');
 
  // let getingredient: string[] = [];
  // this.getIngredients = [
  //   esponse.strIngredient1,
 
  // ]

  // for (let i = 1; i <= 20; i++) {
  //   const ingredient = response['strIngredient' + i];
  //   if (ingredient) {
  //     this.ingredients.push(ingredient);
    // }
  }
  

  //create an array of ingridents so it can be looped through. 1. in array, 2. loop through them. 3. display
  //getrecipe id but before getnutriton abouve get nution use array list. but loop through ingreds and siplay
  //create an array with 2 strings 
  //strIngredient1 and strMeasure1
    //strIngredient1 and strMeasure1
  //strIngredient1 and strMeasure1
  //strIngredient1 and strMeasure1
//etc..

//then loop through array to create a single string in this.ingredients
//this.ingredients = strMeasure1+" " + strIngreident1 + ", " +
//strmeasure2 + " " +

// an array with two strings 
// }



/*
ingredientsList() {
  for (let i = 1; i < 21; i++) {
    let ingredient;
    if (this.choiceMeal[`strMeasure${i}`] !== null
      && this.choiceMeal[`strMeasure${i}`] !== undefined
      && this.choiceMeal[`strIngredient${i}`] !== undefined
      && this.choiceMeal[`strIngredient${i}`] !== null) {
      ingredient = `${this.choiceMeal[`strMeasure${i}`]} ${this.choiceMeal[`strIngredient${i}`]}`;
      this.ingredients = [...this.ingredients, ingredient];
    }
  }
}
*/
}
