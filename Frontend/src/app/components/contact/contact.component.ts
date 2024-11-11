import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactserviceService } from 'src/app/services/contact/contactservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactFrom!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private contactservice: ContactserviceService,
    private rt:Router,
  ){}

  ngOnInit() {
    // nheb nkolo hadharli melowel win bch nhot les données
    this. contactFrom = this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z0-9 ]+$")]],
      mail:["",[Validators.required,Validators.email]],
      message:["",[Validators.required ,Validators.pattern("^[a-zA-Z0-9 ]+$"),Validators.minLength(8)]]
      
    })
   
  }

  addContact(){
    this.contactservice.addContact(this.contactFrom ).subscribe((res)=>{
      console.log(res)
    
    this.Toast.fire({
      icon: 'success',
      title: 'Contact Added successfully'
    });    
    this.rt.navigate([""])
  },
  (error) => {
    console.error("Error adding feedback:", error); // Gestion des erreurs
    this.Toast.fire({
     icon: "error",
     title: "Failed to add Contact"
    }); 
  }  
);   
}
Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
}

