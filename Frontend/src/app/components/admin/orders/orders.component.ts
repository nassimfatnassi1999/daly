import { Component, OnInit } from '@angular/core';
import { DishOrder } from '../../../models/DishOrder';
import { DishOrderService } from 'src/app/services/dishOrder/dish-order.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: DishOrder[] = [];
  sortedColumn: string = '';
  isAscending: boolean = true;

  constructor(private toastr : ToastrService, private dishOrderService: DishOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.dishOrderService.getAllOrders().subscribe(
      (orders: DishOrder[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  deleteOrder(id: number): void {
    // Confirm with the user before deleting
    Swal.fire({
      title: "Order Delete",
      text: "Are you sure you want to Delete this order?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dishOrderService.deleteOrder(id).subscribe(
          () => {
            // If deletion is successful, remove the order from the local array
            this.orders = this.orders.filter(order => order.id_order !== id);
            Swal.fire("Order Deleted!", "", "success");
          },
          () => {
            Swal.fire("Error", "Failed to delete order", "error");
          }
        );
      } else {
        Swal.fire("Order wasn't Deleted", "", "info");
      }
    });   
  }
  
  // Function to toggle sorting order and column
  sortOrders(column: keyof DishOrder): void {
    if (this.sortedColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }
  
    // Sort the orders based on the selected column and order
    this.orders.sort((a, b) => {
      const valA = (a[column] as unknown) as string;
      const valB = (b[column] as unknown) as string;
  
      if (this.isAscending) {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
  }
  
}
