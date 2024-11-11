


import { Feedback } from "./Feedback";
import { User } from "./User";

export class FullFeedbackUser{
  FeedbackID!: number;
    title!: string;
    status!: string;
    type!: string;
    description!: string;
    id_restaurant!:number;
  user!:User;
}