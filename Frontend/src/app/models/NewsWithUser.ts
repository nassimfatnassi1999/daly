import { Image } from "./Image";
import { User } from "./User";

export class NewswithUsers{
    id!:number;
    title!:string;
    comment!:string;
    image!:Image;
    date!:Date;
    user!:User   
}