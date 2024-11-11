import { Allergy } from "./Allergy";
import { User } from "./User";

export class FullResponse{
  user!:User;
  listAllergy!: Allergy[];
}