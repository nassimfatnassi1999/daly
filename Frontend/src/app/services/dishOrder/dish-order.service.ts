// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishOrder } from 'src/app/models/DishOrder';

@Injectable({
  providedIn: 'root'
})
export class DishOrderService {
  private baseUrl = 'http://localhost:9090/restaurant/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<DishOrder[]> {
    return this.http.get<DishOrder[]>(this.baseUrl);
  }

  getOrderById(id: number): Observable<DishOrder> {
    return this.http.get<DishOrder>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: DishOrder): Observable<DishOrder> {
    return this.http.post<DishOrder>(this.baseUrl, order);
  }

  updateOrder(id: number, order: DishOrder): Observable<DishOrder> {
    return this.http.put<DishOrder>(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
