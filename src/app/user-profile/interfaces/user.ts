export interface IUser {
    id:          number;
    name:        string;
    password:    string;
    favorites:   Favorite[];
    passports:   Passport[];
    mealRatings: MealRatings[];
}

export interface Favorite {
    id:      number;
    userId:  number;
    mealId:  number;
}

export interface Passport {
    id:        number;
    userId:    number;
    countryId: number;
    country:   Country;
}

export interface MealRatings {
    id:          number;
    userId:      number;
    mealId:      number;
    rating?:     number;
    countryName: string;
}

export interface Country {
    id:      number;
    name:    string;
    flagURL: string;
}
