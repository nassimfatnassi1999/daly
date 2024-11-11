import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: any;

  constructor(private router:Router, private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.restaurantService.getRestaurantById(+id).subscribe(restaurant => {
        this.restaurant = restaurant;
      });
    } else {
      // Handle the case where 'id' is null
      console.error('Restaurant ID is null');
    }
  }
  goBack(): void {
    this.router.navigate(['/admin/restaurants']); // Adjust the route as needed
  }
}
