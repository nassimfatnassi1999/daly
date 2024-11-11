import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dropdownVisible = false;
  firstName!: string;
  user!: User;
  constructor(private us : UserServicesService, private router : Router){}
  ngOnInit(){
    if(this.isLoggedIn()){
      this.us.getCurrentUser().then((user) => {
        if(user){
          this.firstName = user.firstName;
          this.user = user;
        }
      })
    }
  }

  isAdminOrRestaurant(){
    return this.user.role == "ADMIN" || this.user.role == "RESTAURANT";
  }
  isAdmin(){
    return this.user.role == "ADMIN";
  }
 


  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  logout(){
    this.us.logout();
    this.router.navigate(["/"]);
  }
  isLoggedIn(){
    return this.us.isLoggedIn();
  }
  login(){
    this.router.navigate(["/login"]);
  }
  navigate(str: string){
    this.router.navigate([str]);
  }
}
