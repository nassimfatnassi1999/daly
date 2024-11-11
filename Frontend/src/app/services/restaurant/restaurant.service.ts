import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Restaurant } from '../../models/Restaurant';
import { Dish } from '../../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'http://localhost:9090/restaurant/restaurants';

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl).pipe(
      tap(data => console.log('Fetched restaurants:', data)),
      catchError(error => {
        console.error('Error fetching restaurants:', error);
        throw error;
      })
    );
  }
  
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  updateRestaurant(id: number, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, restaurant);
  }
  getDishesByCategory(restaurantId: number, category: string): Observable<Dish[]> {
    const url = `${this.apiUrl}/${restaurantId}/dishes?category=${category}`;
    return this.http.get<Dish[]>(url);
  }
  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addDish(restaurantId: number, dish: Dish): Observable<Dish> {
    const url = `${this.apiUrl}/${restaurantId}/dishes`; // Adjust URL as per your backend API
    return this.http.post<Dish>(url, dish);
  }
  incrementRestaurantTotalOrders(id: number): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${id}/increment-orders`, {});
  }
  getDishesByRestaurantId(id: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/${id}/dishes`);
  }
}
