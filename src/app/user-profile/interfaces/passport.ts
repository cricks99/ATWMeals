export interface IPassport {
    id:        number;
    userId:    number;
    countryId: number;
    country:   Country;
}

export interface Country {
    id:      number;
    name:    string;
    flagURL: null;
}
