

import { Allergy } from "./Allergy";
import { User } from "./User";

export class FullAlergyUser{
  userdtos!:User[];
  alerrgys!: Allergy[];
}
export interface AllAlergyUser {
  userNanme: string;
  email: string;
  namAlergy: string;
  date: string;
 dietry_restrictionsary: string;
  level: string;
  id_Allergy:number;
}