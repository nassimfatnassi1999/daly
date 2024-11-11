// menu.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../../models/Dish';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderListComponent } from '../order-list/order-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurantId!: number;
  dishes!: Dish[];
  orderList: Dish[] = [];
  shoppingCartCount: number = 0;
  orderListDialogOpen: boolean = false;
  selectedCategory: string = 'all'; // Initialize with 'all'

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
      this.getDishes();
    });
  }

  getDishes() {
    if (this.selectedCategory === 'all') {
      this.restaurantService.getDishesByRestaurantId(this.restaurantId).subscribe(dishes => {
        this.dishes = dishes;
      });
    } else {
      this.restaurantService.getDishesByCategory(this.restaurantId, this.selectedCategory).subscribe(dishes => {
        this.dishes = dishes;
      });
    }
  }

  addToOrderList(dish: Dish) {
    this.orderList.push(dish);
    this.shoppingCartCount++;
    this.toastr.success('Item added to the order list', 'Success');
  }

  openOrderListDialog() {
    if (!this.orderListDialogOpen) {
      const dialogRef = this.dialog.open(OrderListComponent, {
        width: '250px',
        data: {orderlist: this.orderList, id_restaurant: this.restaurantId} ,
        
      });

      dialogRef.afterClosed().subscribe(() => {
        this.orderListDialogOpen = false;
      });

      dialogRef.componentInstance.orderPlaced.subscribe(() => {
        dialogRef.close();
      });

      this.orderListDialogOpen = true;
    }
  }

  goBack(): void {
    this.router.navigate(['/restaurants']);
  }

  filterDishes(category: string): void {
    this.selectedCategory = category;
    this.getDishes();
  }
  sortByPrice(order: 'asc' | 'desc') {
    if (order === 'asc') {
      this.dishes.sort((a, b) => a.price - b.price);
    } else {
      this.dishes.sort((a, b) => b.price - a.price);
    }
  }
  
}