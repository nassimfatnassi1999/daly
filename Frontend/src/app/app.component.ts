import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RestaurantApp';
  excludedUrls = ["/login","/register", "/admin","/resetpassword"]
  constructor(private router: Router) {}
  wantsHeader(){
    return this.excludedUrls.filter((val)=>this.router.url.startsWith(val)).length == 0;
  }
  wantsFooter(){
    return this.excludedUrls.filter((val)=>{ return this.router.url.startsWith(val)}).length == 0;
  }
}
