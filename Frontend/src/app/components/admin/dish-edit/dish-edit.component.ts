import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishService } from '../../../services/dish/dish.service';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { Dish } from '../../../models/Dish';
import { Restaurant } from '../../../models/Restaurant';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit {
  dishId!: number;
  dish!: Dish; 
   // Define the 'dish' property
  
  dishForm!: FormGroup;
  dishData: any; // Define a property to hold the passed data
  restaurants: Restaurant[] = [];
  categoryOptions: string[] = Object.values(Category).filter(value => typeof value === 'string');

  constructor(
    private dialogRef: MatDialogRef<DishEditComponent>,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to receive data
  ) {
    this.dishData = data.dishId; // Assign the injected data to the property
    
    this.dish = data.dish;
    console.log("dish in constructor:" );
    console.log(this.dish);
    
  }

  async ngOnInit() {
    this.dishForm = this.formBuilder.group({
      id_dish: [0],
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      category: ['', Validators.required],
      photo: ['']
    });
  }

  patchFormWithDishDetails(dish: Dish): void {
    this.dishForm.patchValue({
      id_dish: dish.id_dish,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category: dish.category,
      restaurant: dish.restaurant,
      photo: dish.photo
    });
  }

  updateDish(): void {
    this.patchFormWithDishDetails(this.dish);
    console.log("dishForm : ");
    
    console.log(this.dishForm.value);
    
    if (this.dishForm.valid) {
      this.dishService.updateDish(this.dish.id_dish, this.dishForm.value)

      
        .subscribe(() => {
          this.toastr.success('Dish was Edited Successfully', 'Success');
          this.dialogRef.close();
          console.log(this.dishForm.value);
        });
    } else {
      this.toastr.error('Invalid form data', 'Error');
      // console.log("issssss"+this.dishData.dishId);
      console.log(this.dishForm.value);

    }
  }

  handlePhotoInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.dishForm.patchValue({ photo: file.name });
    }
  }

  goBack(): void {
    this.dialogRef.close();
  }
}
