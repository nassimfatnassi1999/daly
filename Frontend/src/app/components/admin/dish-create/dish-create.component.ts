import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit {
  dishForm!: FormGroup;
  category: Category = Category.Mlawi;
  rcategory: RestaurantCategory = RestaurantCategory.OTHER;
  badge: Badge = Badge.New;
  newDish: Dish = {
    id_dish: 0,
    name: '',
    description: '',
    price: 0,
    photo: '',
    orders: 0,
    category: '',
    restaurant: {
      id_restaurant: 0,
      name: '',
      logo: '',
      category: this.rcategory,
      averageRating: 0,
      waitTime: 0,
      isEcoFriendly: false,
      contactInfo: '',
      total_orders: 0,
      delivery: false,
      menu: [],
    }
  };

  dishes: Dish[] = [];
  restaurants: Restaurant[] = [];
  categoryOptions: string[] = Object.values(Category).filter(value => typeof value === 'string');

  constructor(
    private dialogRef: MatDialogRef<DishCreateComponent>,

    private toastr: ToastrService,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getDishes();
    this.getRestaurants();

    this.dishForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      photo: ['', Validators.required],
      category: ['', Validators.required],
      restaurant: ['', Validators.required] // Add restaurant validation
    });
  }

  createDish(): void {
    console.log(this.newDish);

    if (this.dishForm.valid) {
      this.dishService.addDish(this.newDish).subscribe(() => {
        this.toastr.success("Dish Created Successfuly","success")
        this.router.navigate(['/admin/dishes']);
      });
    } else {
      // Mark all fields as touched to display validation errors
      this.dishForm.markAllAsTouched();
    }
  }
  handlePhotoInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Store the file name in the newRestaurant object
      this.newDish.photo = file.name;

      // Get the logo preview element
      const logoPreviewElement = document.getElementById('PhotoPreview');
      if (logoPreviewElement) {
        // Optionally, you can display a preview of the logo
        const reader = new FileReader();
        reader.onload = (e: any) => {
          logoPreviewElement.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  getDishes(): void {
    this.dishService.getAllDishes()
      .subscribe(dishes => this.dishes = dishes);
  }

  getRestaurants(): void {
    this.restaurantService.getAllRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }
  goBack(): void {
    this.dialogRef.close();

  }
}
