import { Restaurant } from "./Restaurant";

export interface Dish {
  id_dish: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  category: string;
  orders:number;
  restaurant: Restaurant;
}
