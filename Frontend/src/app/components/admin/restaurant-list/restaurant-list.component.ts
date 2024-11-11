import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../../models/Restaurant';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import Swal from 'sweetalert2';
import { RestaurantEditComponent } from '../restaurant-edit/restaurant-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { RestaurantCreateComponent } from '../restaurant-create/restaurant-create.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private dialog: MatDialog,private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
    
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Error loading restaurants:', error);
        
      }
    );
  }

  showRestaurantDetails(restaurant: Restaurant) {
    const ecoFriendlyBadge = restaurant.isEcoFriendly ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>';
    const deliveryBadge = restaurant.delivery ? '<span class="badge bg-success">Available</span>' : '<span class="badge bg-danger">Not Available</span>';

    const htmlContent = `
      <div style="text-align: left;">
        <h3>${restaurant.name}</h3>
        <p><strong>Average Rating:</strong> ${restaurant.averageRating}</p>
        <p><strong>Wait Time:</strong> ${restaurant.waitTime} mins</p>
        <p><strong>Eco-friendly:</strong> ${ecoFriendlyBadge}</p>
        <p><strong>Contact Info:</strong> ${restaurant.contactInfo}</p>
        <p><strong>Delivery:</strong> ${deliveryBadge}</p>
        <p><strong>Total Orders:</strong> ${restaurant.total_orders}</p>
      </div>
    `;

    Swal.fire({
      title: 'Restaurant Details',
      html: htmlContent,
      imageUrl: 'assets/img/1.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Restaurant Logo',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
    });
}
deleteRestaurant(id: number): void {
  // Confirm with the user before deleting
  Swal.fire({
    title: 'Delete Restaurant',
    text: 'Are you sure you want to delete this restaurant?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // If the user confirms the delete action
      // Call the deleteRestaurant method from the service passing the id
      this.restaurantService.deleteRestaurant(id).subscribe(
        () => {
          // If deletion is successful, remove the restaurant from the local array
          this.restaurants = this.restaurants.filter(restaurant => restaurant.id_restaurant !== id);
          Swal.fire(
            'Deleted!',
            'The restaurant has been deleted.',
            'success'
          );
          // Optionally, display a success message or navigate to a different page
        },
        error => {
          // Handle any errors that occur during deletion
          console.error('Error deleting restaurant:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the restaurant.',
            'error'
          );
          // Optionally, display an error message to the user
        }
      );
    }
  });
}
editRestaurant(restaurant: Restaurant) {
  const dialogRef = this.dialog.open(RestaurantEditComponent, {
    width: '100%',
    height: '80%',
    disableClose: true,
    data: {
      message: 'Session expired. Please log in again.',
      restaurantId: restaurant.id_restaurant // Pass the restaurant ID here
    },
    autoFocus: false,
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed with result:', result);
  });
}

addDish(restaurant: Restaurant) {
  const dialogRef = this.dialog.open(AddDishComponent, {
    width: '100%', // Utilize a percentage width to fill the page width
    height: '80%', // Set a fixed height or max-height if needed    disableClose: true,
    data: { message: 'Session expired. Please log in again.' },
    autoFocus: false, // Pour empêcher le focus automatique sur un champ
    panelClass: 'custom-dialog-container' // Classe CSS personnalisée pour le conteneur du dialogue
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed with result:', result);
    this.loadRestaurants();
  });
}
createRestaurant() {
  const dialogRef = this.dialog.open(RestaurantCreateComponent, {
    width: '100%', // Utilize a percentage width to fill the page width
    height: '80%', // Set a fixed height or max-height if needed
    disableClose: true,
    data: { message: 'Session expired. Please log in again.' },
    autoFocus: false,
    panelClass: 'custom-dialog-container' // Custom CSS class for the dialog container
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed with result:', result);
  });
}
}
