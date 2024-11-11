import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Allergy } from 'src/app/models/Allergy';
import { AllergieServicesService } from 'src/app/services/allergie/allergie-services.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-allergie',
  templateUrl: './add-allergie.component.html',
  styleUrls: ['./add-allergie.component.css']
})
export class AddAllergieComponent {


  //display avedc ngif
  toggleMyInfo(){
    this.myinfo=!this.myinfo
  }

  id_user!:number;
  myinfo!:boolean
  // declaration tableau
  allergieTab: Allergy[] =[
  //  {name: "achref", level:"Light", dietry_restrictionsary:"string", date:"2024-04-01" },
  ];

  // Form ID
  allergieForm!: FormGroup;

  // naayet lel service
  constructor(
    private formBuilder: FormBuilder,
    private allergieService:  AllergieServicesService,
    private rt:Router,
    private us : UserServicesService
  ) { }

  // tekhdem ki yetlansa component
  async ngOnInit() {
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.id_user = user.id;
      }
    })
    // nheb nkolo hadharli melowel win bch nhot les données
    this.allergieForm = this.formBuilder.group({
      name:["", [Validators.required,Validators.minLength(3)]],
      level:["",Validators.required],
      dietry_restrictionsary:["",[Validators.required, Validators.minLength(5)]],
      date:["",Validators.required]
    })
   
  }


  getAllergy(){
    this.allergieService.getAllergie().subscribe((response)=>{
      this.allergieTab = response
    })
  }

  // add btn
  addAllergie() {
    if(this.allergieForm.valid){

    // Ajouter une allergie et afficher le toast après succès
    this.allergieService.addAllergie(this.allergieForm.value,this.id_user).subscribe((response) => {
        // Afficher le toast après un ajout réussi
      
        this.Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        });
        this.rt.navigate(["show-allergie"])
      },

      (error) => {
        console.error("Error adding allergy:", error); // Gestion des erreurs
        this.Toast.fire({
         icon: "error",
         title: "Failed to add allergy"
        });
      }
    );
  }
  
}


// creation alert
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