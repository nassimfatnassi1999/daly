
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from 'src/app/models/Allergy';

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {
  allergieURL: string ="http://localhost:9090/apiachref/Allergy";

  constructor(
    private httpClient: HttpClient
  ) { }
  addContact(contactObj:any){
    console.log(contactObj)
    return this.httpClient.post(this.allergieURL + "/addContact" ,contactObj.value);

  }
  getContact(){
    return this.httpClient.get<Contact[]>(this.allergieURL+"/getconatct")
  }

  delete(id_contact :number){
    return this.httpClient.delete(`${this.allergieURL}/deletecontact/${id_contact}`);

  }
  
}
