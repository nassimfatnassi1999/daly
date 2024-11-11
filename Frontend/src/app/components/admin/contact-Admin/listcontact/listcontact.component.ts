import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Allergy';
import { ContactserviceService } from 'src/app/services/contact/contactservice.service';

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.css']
})
export class ListcontactComponent {
  contactTab : Contact[]=[];

  constructor(
    private contactservice : ContactserviceService
  ){

  }
  ngOnInit(){
  this.getAll();
  }
  deleteContact(id:number){
    this.contactservice.delete(id).subscribe((res)=>{
      console.log(res)
     this.getAll()
  })
    
}
getAll(){
  this.contactservice.getContact().subscribe((response)=>{
    this.contactTab=response;
    console.log(response)
  })
   
  }
}
