import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { Restaurant } from '../../../models/Restaurant';
import { RestaurantCategory } from 'src/app/models/RestaurantCategory';
import { Badge } from 'src/app/models/Badge';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent {
  category: RestaurantCategory = RestaurantCategory.OTHER;
  badge: Badge = Badge.Best_Donor;
  newRestaurant: Restaurant = {
    id_restaurant: 0,
    name: '',
    logo: '',
    category: this.category,
    averageRating: 0,
    waitTime: 0,
    isEcoFriendly: false,
    contactInfo: '',
    delivery: false,
    total_orders: 0,
    menu: [],
  };

  restaurantForm: FormGroup;

  constructor(    private dialogRef: MatDialogRef<RestaurantCreateComponent>,

    private toastr: ToastrService,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      category: [this.category, Validators.required],
      averageRating: [0, [Validators.required, Validators.max(5), Validators.min(1)]],
      waitTime: [0, [Validators.required, Validators.max(60), Validators.min(5)]],
      isEcoFriendly: [false],
      contactInfo: [''],
      delivery: [false],
      total_orders: [0],
      menu: [[]],
    });
    
  }

  createRestaurant(): void {
    console.log(this.newRestaurant);

    if (this.restaurantForm.valid) {
      // If form is valid, proceed with creating the restaurant
      this.newRestaurant = this.restaurantForm.value;

      this.restaurantService.addRestaurant(this.newRestaurant).subscribe(() => {
        this.toastr.success("Restaurant Added successfuly","success");
        this.dialogRef.close();

      });
    } else {
      // If form is invalid, mark all fields as touched to display validation errors
      this.restaurantForm.markAllAsTouched();
    }
  }

  getCategoryKeys() {
    return Object.keys(RestaurantCategory);
  }

  handleLogoInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Store the file name in the newRestaurant object
      this.newRestaurant.logo = file.name;

      // Get the logo preview element
      const logoPreviewElement = document.getElementById('logoPreview');
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
  goBack(): void {
    this.dialogRef.close();

  }
  
}
