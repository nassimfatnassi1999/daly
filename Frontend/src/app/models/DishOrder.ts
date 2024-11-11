// dish-order.model.ts
import { Dish } from "./Dish";

export interface DishOrder {
  id_order: number;
  totalPrice: number;
  orderTime: Date;
  user: number;
  dishes: Dish[];
}
