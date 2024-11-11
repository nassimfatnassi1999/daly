import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DishService } from '../../../services/dish/dish.service';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { Dish } from '../../../models/Dish';
import { Restaurant } from '../../../models/Restaurant';
import { Category } from '../../../models/Category';
import { RestaurantCategory } from '../../../models/RestaurantCategory';
import { Badge } from 'src/app/models/Badge';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  dishForm!: FormGroup; // Declare FormGroup
  category: Category = Category.Mlawi;
  rcategory: RestaurantCategory = RestaurantCategory.OTHER;
  badge: Badge = Badge.New;

  newDish: Dish = {
    id_dish: 0,
    name: '',
    description: '',
    price: 0,
    photo: '',
    category: '',
    orders:0,
    restaurant: {
      id_restaurant: 0,
      name: '',
      logo: '',
      category: this.rcategory,
      averageRating: 0,
      waitTime: 0,
      isEcoFriendly: false,
      contactInfo: '',
      total_orders:0,
      delivery: false,
      menu: [],
    }
  };

  restaurants: Restaurant[] = [];
  Category = Category;
  categoryOptions: string[] = Object.values(Category).filter(value => typeof value === 'string');

  constructor(
    private dialogRef: MatDialogRef<AddDishComponent>,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) { }

  ngOnInit(): void {
    this.getRestaurants();
    this.route.params.subscribe((params: Params) => {
      const restaurantId = +params['id'];
      if (typeof restaurantId === 'number') {
        this.newDish.restaurant.id_restaurant = restaurantId;
      } else {
        console.error('Restaurant ID is not a valid number:', restaurantId);
      }
    });

    // Initialize the form with validators
    this.dishForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      photo: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  createDish(): void {
    console.log(this.newDish);
    if (!this.newDish || !this.newDish.restaurant || !this.newDish.restaurant.id_restaurant) {
      console.error('Restaurant ID is undefined');
      this.toastr.success('Dish added to the restaurant', 'Success');
      this.dialogRef.close();

      return;
    }
    this.restaurantService.addDish(this.newDish.restaurant.id_restaurant, this.newDish).subscribe(() => {
      this.router.navigate(['/admin/restaurants']); // Adjust the route as needed
      this.toastr.success('Dish added to the restaurant', 'Success');
    }, (error) => {
      // Handle error
      this.toastr.error('Dish wasnt added to the restaurant', 'error');
    });
  }

  handlePhotoInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.newDish.photo = file.name;
      const photoPreviewElement = document.getElementById('photoPreview');
      if (photoPreviewElement) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          photoPreviewElement.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  getRestaurants(): void {
    this.restaurantService.getAllRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }
  goBack(): void {
    this.dialogRef.close();

  }
}
