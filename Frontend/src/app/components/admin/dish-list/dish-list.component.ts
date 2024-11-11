import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/Dish';
import { DishService } from 'src/app/services/dish/dish.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DishEditComponent } from '../dish-edit/dish-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DishCreateComponent } from '../dish-create/dish-create.component';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dialog: MatDialog, private toastr: ToastrService, private dishService: DishService) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getAllDishes().subscribe(
      (dishes: Dish[]) => {
        this.dishes = dishes;
        console.log(dishes);
        
      },
      (error) => {
        this.toastr.error('Dish wasnt edited', 'error');
      }
    );
  }

  deleteDish(id: number): void {
    Swal.fire({
      title: 'Delete Dish',
      text: 'Are you sure you want to delete this dish?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms the delete action
        // Call the deleteDish method from the service passing the id
        this.dishService.deleteDish(id).subscribe(
          () => {
            // If deletion is successful, remove the dish from the local array
            this.toastr.success('Dish deleted Successfully', 'Success');
            this.dishes = this.dishes.filter(dish => dish.id_dish !== id);
            Swal.fire(
              'Deleted!',
              'The dish has been deleted.',
              'success'
            );
            // Optionally, display a success message or navigate to a different page
          },
          error => {
            // Handle any errors that occur during deletion
            console.error('Error deleting dish:', error);
            this.toastr.error('Dish was not deleted', 'Error');
            Swal.fire(
              'Error!',
              'An error occurred while deleting the dish.',
              'error'
            );
            // Optionally, display an error message to the user
          }
        );
      }
    });
  }
  showDishDetails(dish: Dish) {
    const htmlContent = `
      <div style="text-align: left;">
        <h3>${dish.name}</h3>
        <p><strong>Description:</strong> ${dish.description}</p>
        <p><strong>Price:</strong> ${dish.price}dt</p>
        <p><strong>Category:</strong> ${dish.category}</p>
        <p><strong>Category:</strong> ${dish.restaurant.name}</p>

        <p><strong>Orders:</strong> ${dish.orders}</p>
        
      </div>
    `;

    Swal.fire({
      title: 'Dish Details',
      html: htmlContent,
      imageUrl: 'assets/img/mlawishawarma.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Dish Photo',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
    });
}
editDish(dish: Dish) {
  const dialogRef = this.dialog.open(DishEditComponent, {
    width: '100%', // Utilize a percentage width to fill the page width
    height: '80%', // Set a fixed height or max-height if needed    disableClose: true,
    data: { message: 'Session expired. Please log in again.' ,
    dishId: dish.id_dish, // Pass the restaurant ID here,
    dish: dish

    },
    autoFocus: false, // Pour empêcher le focus automatique sur un champ
    panelClass: 'custom-dialog-container' // Classe CSS personnalisée pour le conteneur du dialogue
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed with result:', result);
  });
}
createDish() {
  const dialogRef = this.dialog.open(DishCreateComponent, {
    width: '100%', // Utilize a percentage width to fill the page width
    height: '80%', // Set a fixed height or max-height if needed    disableClose: true,
    data: { message: 'Session expired. Please log in again.' },
    autoFocus: false,
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed with result:', result);
    if (result === 'success') {
      // Reload dishes or perform any necessary action
      this.loadDishes();
    }
  });
}

}
