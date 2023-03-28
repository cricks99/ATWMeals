import { Component } from '@angular/core';
import { LocalService } from 'src/app/local.service';
import { IUser } from '../interfaces/user';
import { UserRepositoryService } from '../user-repository.service';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent {

  constructor(private repositoryService: UserRepositoryService, private localStore: LocalService,
    private userRepo: UserRepositoryService) {}

    //countryMeals: IMeal | undefined;
    user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}
    countries: any;
    selectedCountry?: any;

    getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.userRepo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});
    }
  }

  ngOnInit(): void {
    this.getUserObject();
  }

  totalUserCountryCount(): number {
    return this.user.passports.length
  }
  
  //onSelect(country: any): void {
    //this.selectedCountry = country.name;
    //this.repositoryService.getPassportByUserId(this.selectedCountry).subscribe(
      //(response) => {this.countryMeals = response;}
    //)
  //}






}

