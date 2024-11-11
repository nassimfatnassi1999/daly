
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../../../services/dish/dish.service';
import { Dish } from '../../../models/Dish';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  dish: Dish | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private dishService: DishService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.dishService.getDishById(+id).subscribe(
        dish => {
          this.dish = dish;
        },
        error => {
          console.error('Error loading dish details:', error);
          // Handle error gracefully, e.g., redirect to a default page or display an error message
        }
      );
    } else {
      // Handle the case where 'id' is null more gracefully
      console.error('Dish ID is null');
      // Redirect to a default page or display an error message
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dishes']); // Adjust the route as needed
  }
}
