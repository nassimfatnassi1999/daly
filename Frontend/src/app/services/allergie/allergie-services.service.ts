import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Allergy } from 'src/app/models/Allergy';
import { Dish } from 'src/app/models/Dish';
import { AllAlergyUser, FullAlergyUser } from 'src/app/models/FullAlergyUser';
import { FullResponse } from 'src/app/models/FullResponse';

@Injectable({
  providedIn: 'root'
})
export class AllergieServicesService {



  allergieURL: string ="http://localhost:9090/allergy";

  // httpClient : Bostagi
  constructor(
    private httpClient: HttpClient
  ) {}
  

  addAllergie(allergieObj: any, id_user: number){
    console.log(allergieObj)
    const body = {...allergieObj, id_user}
    return this.httpClient.post(this.allergieURL + "/add" , body);
  }

  getAllergie(){
    return this.httpClient.get<Allergy[]>(this.allergieURL+ "/get");
  }
  
  deleteAlergy(id_Allergy :number){
    return this.httpClient.delete(`${this.allergieURL}/delete/${id_Allergy}`);

  }
  
  getAllergyByuser(id:number){
    return this.httpClient.get<FullResponse[]>(`${this.allergieURL}/getFullResponse/${id}`)
  }
  updateAlergy(allergieObj: any){
    return this.httpClient.put(this.allergieURL+"/update",allergieObj);
  }
  getAllergyById(id:number){
    return this.httpClient.get<Allergy>(`${this.allergieURL}/getAllergybyid/${id}`)
  }
  getAllAllergyUser(){
    return this.httpClient.get<FullAlergyUser>(this.allergieURL+"/getAllUsersAllery");
  }
  getAllAllergyUserV2(): Observable<AllAlergyUser []>{
    return this.httpClient.get<FullAlergyUser>(this.allergieURL+"/getAllUsersAllery").pipe(
      map((data: FullAlergyUser) => {
       const response : AllAlergyUser [] = [];
        data.alerrgys.forEach((ele) =>{
           const user = data.userdtos
           .find((e) => e.id === ele.id_user);
           response.push({
            id_Allergy:ele.id_Allergy,
            date: ele.date,
            level: ele.level,
            email: user?.email as string,
            namAlergy:ele.name,
            userNanme:`${user?.firstName} ${user?.lastName}`,
            dietry_restrictionsary:  ele.dietry_restrictionsary
           })
        })
       return response;
      })
    );
  }

  getAllergyByLevel(level:any){
    return this.httpClient.get<FullAlergyUser>(`${this.allergieURL}/getAllergybyLevel/${level}`)
  }

  getReccomendedDishes(id_user: number){
    return this.httpClient.get<Dish[]>(`${this.allergieURL}/getreccomanded/${id_user}`)
  }

}
