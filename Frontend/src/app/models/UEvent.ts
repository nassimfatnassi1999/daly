import { Image } from "./Image";
import { User } from "./User";
//import { TypeEvent } from "./TypeEvent";

export interface UEvent {
    id_event: number;
    title: any;
    location:any;
    type:any;
    topic: any;
    image: any; // Utilisation du type Image pour représenter l'image
    date: any;
    user: User;
    user_id: number;
}

  