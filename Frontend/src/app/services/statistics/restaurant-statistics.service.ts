// restaurant-statistics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStatisticsService {

  private baseUrl = 'http://localhost:9090/restaurant'; // Your backend base URL

  constructor(private http: HttpClient) { }

  // Get statistics for best-selling restaurant
  getBestSellingRestaurantStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics/best-selling-restaurant`);
  }

  // Get statistics for most-ordered dish
  getMostOrderedDishStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics/most-ordered-dish`);
  }
}
