import { Badge } from "./Badge";
import { RestaurantCategory } from "./RestaurantCategory";
import { Dish } from "./Dish";

export interface Restaurant {
    id_restaurant: number;
    name: string;
    logo: string;
    category: RestaurantCategory ;
    averageRating: number;
    waitTime: number;
    isEcoFriendly: boolean;
    contactInfo: string;
    delivery: boolean;
    total_orders: number;
    menu: Dish[];
  }