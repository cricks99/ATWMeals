import { Component } from '@angular/core';
import { IUser } from '../user-profile/interfaces/user';
import { UserRepositoryService } from '../user-profile/user-repository.service';
import { NgForm } from '@angular/forms';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}
  //userTest:any = {name: "Bob", password: "Bob123"};
  //userId: number = 0;

  constructor(private repo: UserRepositoryService, private localStore: LocalService) { }

  ngOnInit(): void {
    //this.addUser(this.userTest);  //this will only get created first time.  If exists, will return 0 for id
    //this.getUser(this.userTest);
    
    this.getUserObject();
  }

  getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.repo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});
    }
  }

  addUser(userLogin: any)
  {
    this.repo.addUser(userLogin).subscribe (
      (response) => {this.user = response;});

  }

  loginUser(form: NgForm) {
    let userName = form.form.value.userName;
    let password = form.form.value.password;
    
    this.getUser({name: userName, password: password});
  }

   //API returns id = -1 if wrong username/password
   getUser(userLogin: any)
   {
     this.repo.getUserByPassword(userLogin).subscribe (
       (response) => {
         this.user = response;
         
         if (this.user.id > 0)
           this.localStore.saveData("userId", this.user.id.toString());   
       });
   }
 
  logoutUser()
  {
    this.user.id = 0;
    this.localStore.removeData("userId");
  }
}
