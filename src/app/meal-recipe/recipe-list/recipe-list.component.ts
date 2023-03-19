import { Component, Input } from '@angular/core';
import { IMeal } from '../interfaces/meal';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Input() country: string = "Canadian";
  

  constructor(private repositoryService: MealRepositoryService) {}

  countryMeals: any;

  ngOnInit(): void {
    this.repositoryService.getMealsByArea().subscribe(
      (response) => {this.countryMeals = response;}
    )
  }
}
