import { Component } from '@angular/core';
import { IUser } from '../user-profile/interfaces/user';
import { UserRepositoryService } from '../user-profile/user-repository.service';
import { NgForm } from '@angular/forms';
import { LocalService } from '../local.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}
  newAccount: boolean = false;

  constructor(private repo: UserRepositoryService, private localStore: LocalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserObject();
    this.newAccount = this.route.snapshot.params['index'] === "create";
    
  }

  getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.repo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});
    }
  }

  addUser(form: NgForm) {
    let userName = form.form.value.userName;
    let password = form.form.value.password;

    if (!userName || !password)
      return;    

    this.repo.getUser(userName).subscribe (
      (response) => {
        if (!response)
          this.repo.addUser({id: 0, name: userName, password: password, favorites: [], passports: [], mealRatings: []}).subscribe (
            (response) => {this.getUser({name: userName, password: password})});
        else
          this.user.id = -2; //username already exists
      }
    )
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
         
        if (this.user.id > 0) {
          this.localStore.saveData("userId", this.user.id.toString());
          location.reload();
         }
       });
   }
 
  logoutUser()
  {
    this.user.id = 0;
    this.localStore.removeData("userId");

    location.reload();
  }
}
