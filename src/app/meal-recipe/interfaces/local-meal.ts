export interface ILocalMeal {
    id:         number;
    mealDBId:   number;
    name:       string;
    countryId:  number;
    avgRating:  number;
    country:    Country;
    mealRating: MealRating;
}

export interface Country {
    id:      number;
    name:    string;
    flagURL: string;
}

export interface MealRating {
    id:     number;
    rating: number;
    mealId: number;
    userId: number;
}
