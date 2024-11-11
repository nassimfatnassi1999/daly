import { Component, OnInit } from '@angular/core';
import { RestaurantStatisticsService } from 'src/app/services/statistics/restaurant-statistics.service';

@Component({
  selector: 'app-restaurant-statistics',
  templateUrl: './restaurant-statistics.component.html',
  styleUrls: ['./restaurant-statistics.component.css']
})
export class RestaurantStatisticsComponent implements OnInit {

  bestSellingRestaurantData: any;
  mostOrderedDishData: any;

  constructor(private statisticsService: RestaurantStatisticsService) { }

  ngOnInit(): void {
    this.loadBestSellingRestaurantStatistics();
    this.loadMostOrderedDishStatistics();
  }

  loadBestSellingRestaurantStatistics() {
    this.statisticsService.getBestSellingRestaurantStatistics().subscribe(data => {
      this.bestSellingRestaurantData = data;
      // Call a function to generate the chart using this data
    });
  }

  loadMostOrderedDishStatistics() {
    this.statisticsService.getMostOrderedDishStatistics().subscribe(data => {
      this.mostOrderedDishData = data;
      // Call a function to generate the chart using this data
    });
  }

}
