import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Dish } from '../../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private apiUrl = 'http://localhost:9090/restaurant/dishes';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl).pipe(
      tap(data => console.log('Fetched Dishes:', data)),
      catchError(error => {
        console.error('Error fetching dishes:', error);
        throw error;
      })
    );
  }
  
  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  updateDish(id: number, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  incrementDishOrders(id: number, incrementBy: number): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}/increment-orders?incrementBy=${incrementBy}`, {});
  }
  getDishesByRestaurantId(id: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/${id}/dishes`);
  }
}
