import { Component } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { Restaurant } from 'src/app/models/Restaurant';
import { AllergieServicesService } from 'src/app/services/allergie/allergie-services.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private as : AllergieServicesService, private us : UserServicesService,private rs: RestaurantService){}
  id_user!:number;
  reccomandedDishes!: Dish[];
  bestSellerRestaurant!: Restaurant[];
  async ngOnInit(){
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.id_user = user.id;
      }
    })
    this.as.getReccomendedDishes(this.id_user).subscribe(response => this.reccomandedDishes = response);
    this.rs.getBestSellerRestaurants().subscribe(response => this.bestSellerRestaurant = response)
  }

  isLoggedIn(){
    return this.us.isLoggedIn();
  }
}
