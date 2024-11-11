import { User } from "./User";

export class ForumPost {
    idPost?: number;
    auteurId! : any;
    titlePost! : any;
    contentPost!  : any ;
    creationDatePost! : any;
    topic!: string;
    commentsCount?: number;
    reportsCount?: number;
    likesCount?:number;
    dislikesCount?:number;
    photoPost?: string | null; // Add the photoPost property
    photoUrl?: string; // Add the photoUrl property
    user?: User;
}