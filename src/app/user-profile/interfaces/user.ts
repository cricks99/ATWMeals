export interface IUser {
    id:          number;
    name:        string;
    password:    string;
    favorites:   Favorite[];
    passports:   Passport[];
    mealRatings: Favorite[];
}

export interface Favorite {
    id:      number;
    userId:  number;
    mealId:  number;
    rating?: number;
}

export interface Passport {
    id:        number;
    userId:    number;
    countryId: number;
    country:   Country;
}

export interface Country {
    id:      number;
    name:    string;
    flagURL: string;
}
