import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DishOrder } from 'src/app/models/DishOrder';
import { DishOrderService } from 'src/app/services/dishOrder/dish-order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service'; // Import RestaurantService
import { DishService } from 'src/app/services/dish/dish.service'; // Import DishService
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-list-dialog',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    @Output() orderPlaced: EventEmitter<void> = new EventEmitter<void>(); // Define event emitter

    id_restaurant!: number;
    data: any[] = [];
    newOrder: DishOrder = {
        id_order: 0,
        totalPrice: 0,
        orderTime: new Date(),
        user: 0,
        dishes: []
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<OrderListComponent>,
        private dishOrderService: DishOrderService,
        private restaurantService: RestaurantService, // Inject RestaurantService
        private dishService: DishService, // Inject DishService
        private http: HttpClient,
        private router: Router,
        private toastr : ToastrService
    ) {
        this.data = dialogData.orderlist;
        this.id_restaurant = dialogData.id_restaurant;
    }

    ngOnInit(): void {}

    summarizeItems(data: any[]): any[] {
        console.log(data);
        
        const summary: any[] = [];
    
        data.forEach(item => {
            const existingItem = summary.find(summaryItem => summaryItem.name === item.name);
    
            if (existingItem) {
                existingItem.count++;
                existingItem.totalPrice += item.price;
            } else {
                summary.push({
                    name: item.name,
                    count: 1,
                    totalPrice: item.price,
                    dishId: item.id, // Include dishId in summary
                    restaurantId: item.restaurantId // Include restaurantId in summary
                });
            }
        });
    
        return summary;
    }

    calculateTotalPrice(): number {
        let totalPrice = 0;
        this.data.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice;
    }

    removeItem(index: number): void {
        this.data.splice(index, 1);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    createOrder(): void {
        // Check if the order has items
        if (this.data.length === 0) {
            Swal.fire("Empty Order", "Please add items to your order", "warning");
            return; // Exit the method if the order is empty
        }
    
        this.newOrder.user = 1;
        this.newOrder.totalPrice = this.calculateTotalPrice();
    
        this.dishOrderService.createOrder(this.newOrder).subscribe((order: DishOrder) => {      
        
            
            this.restaurantService.incrementRestaurantTotalOrders(this.id_restaurant).subscribe(() => {
                    
              });;
     
            this.router.navigate(['/restaurants']);
            Swal.fire({
                title: "Confirm Order",
                text: "Are you sure you want to confirm your order?",
                showCancelButton: true,
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33"
            }).then((result) => {
                if (result.isConfirmed) {

                    this.orderPlaced.emit(); // Emit event when order is placed
                    Swal.fire("Order Confirmed!", "", "success");
                } else {
                    Swal.fire("Order Cancelled", "", "info");
                }
            });
        });
    }
    
}