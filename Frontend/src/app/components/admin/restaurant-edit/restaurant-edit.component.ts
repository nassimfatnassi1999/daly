import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { Restaurant } from '../../../models/Restaurant';
import { RestaurantCategory } from '../../../models/RestaurantCategory';
import { Badge } from 'src/app/models/Badge';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  restaurantForm!: FormGroup;
  category: RestaurantCategory = RestaurantCategory.OTHER;
  badge: Badge = Badge.New;
  restaurantData: any; // Define a property to hold the passed data

  constructor(
    private dialogRef: MatDialogRef<RestaurantEditComponent>,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to receive data
  ) {
    this.restaurantData = data; // Assign the injected data to the property
  }
  

  ngOnInit(): void {
    this.restaurantForm = this.formBuilder.group({
      id_restaurant: [0],
      name: ['', Validators.required],
      total_orders: [0],
      logo: ['', Validators.required],
      category: [this.category, Validators.required],
      averageRating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      waitTime: [0, [Validators.required, Validators.min(5), Validators.max(60)]],
      isEcoFriendly: [false],
      contactInfo: ['', [Validators.required, Validators.pattern]],
      delivery: [false],
      menu: [[]]
    });

    if (this.data && this.data.restaurantId) {
      const id = this.data.restaurantId;
      this.restaurantService.getRestaurantById(id).subscribe(restaurant => {
        // Patch the form with the restaurant data
        this.restaurantForm.patchValue({
          id_restaurant: restaurant.id_restaurant,
          name: restaurant.name,
          total_orders: restaurant.total_orders,
          logo: restaurant.logo,
          category: restaurant.category,
          averageRating: restaurant.averageRating,
          waitTime: restaurant.waitTime,
          isEcoFriendly: restaurant.isEcoFriendly,
          contactInfo: restaurant.contactInfo,
          delivery: restaurant.delivery,
          menu: restaurant.menu
        });
      });
    } else {
      // Redirect or close the dialog if the restaurant ID is not provided
      this.dialogRef.close();
    }
  } getCategoryKeys() {
    return Object.keys(RestaurantCategory);
  }
  updateRestaurant(): void {
    if (this.restaurantForm.valid) {
      this.restaurantService.updateRestaurant(this.restaurantForm.value.id_restaurant, this.restaurantForm.value).subscribe(() => {
        this.toastr.success('Restaurant was Edited Successfully', 'Success');
        this.dialogRef.close();

        this.restaurantForm.reset(); // Utilisez la méthode reset() pour réinitialiser le formulaire
      });
    } else {
      // Form is invalid, display error message or take appropriate action
      console.log('Form is invalid');
      this.toastr.error('Something went wrong', 'Error');

      this.dialogRef.close();

    }
  }
  
  
  handleLogoInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Store the file name in the restaurant object
      this.restaurantForm.patchValue({ logo: file.name });

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
