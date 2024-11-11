import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/Restaurant';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  listRestaurant: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm: string = '';
  p: number = 1;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants()
      .subscribe(restaurants => {
        this.listRestaurant = restaurants;
        this.filteredRestaurants = [...this.listRestaurant];
      });
  }

  showMenu(restaurantId: number): void {
    this.router.navigate(['/menu', restaurantId]);
  }

  updateFilteredList(): void {
    if (!this.searchTerm) {
      this.filteredRestaurants = [...this.listRestaurant];
    } else {
      this.filteredRestaurants = this.listRestaurant.filter((restaurant: Restaurant) =>
        restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}