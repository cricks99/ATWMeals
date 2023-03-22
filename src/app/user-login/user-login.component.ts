import { Component } from '@angular/core';
import { IUser } from '../user-profile/interfaces/user';
import { UserRepositoryService } from '../user-profile/user-repository.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user: IUser | undefined;
  
  userTest:any = {name: "TestNewUser", password: "Password7"};

  constructor(private repo:UserRepositoryService) {}

  ngOnInit(): void {
    //this.addUser(this.userTest);  //this will only get created first time.  If exists, will return 0 for id
    this.getUser(this.userTest);
  }

  getUser(userLogin: any)
  {
    this.repo.getUserByPassword(userLogin).subscribe (
      (response) => {this.user = response;});
  }

  addUser(userLogin: any)
  {
    this.repo.addUser(userLogin).subscribe (
      (response) => {this.user = response;});
  }

}
