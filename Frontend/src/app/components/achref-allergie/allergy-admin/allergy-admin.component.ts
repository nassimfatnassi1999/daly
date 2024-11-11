import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AllAlergyUser, FullAlergyUser } from 'src/app/models/FullAlergyUser';
import { AllergieServicesService } from 'src/app/services/allergie/allergie-services.service';
import { DetailAllergieComponent } from '../detail-allergie/detail-allergie.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Allergy } from 'src/app/models/Allergy';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-allergy-admin',
  templateUrl: './allergy-admin.component.html',
  styleUrls: ['./allergy-admin.component.css']
})
export class AllergyAdminComponent {
  allergyUser: FullAlergyUser[]=[];
  allergy:any; userdtos:any;
  listalerrgys:AllAlergyUser[]=[];
  filterListAllergy:AllAlergyUser[]=[];
  currentPage = 1;
  
  selectedAllergy:any=Allergy;
//searchResults=this.allergyUser;

  searchTerm: string = '';
  //searchResults: FullAlergyUser[] = [];
  serchInpuConroller = new FormControl("")

  constructor(
    private allergieService:  AllergieServicesService,
    private rt:Router,
  ) { }


  ngOnInit() {
    this.searchAllergie();
    this.serchInpuConroller.valueChanges.subscribe((value )=>{
      if(value){
        this.filterListAllergy=this.listalerrgys.filter((e)=>
          e.userNanme.toLowerCase().includes(value.toLocaleLowerCase())||
        e.userNanme.toLowerCase().includes(value.toLocaleLowerCase())||
        e.date.toLowerCase().includes(value.toLocaleLowerCase())||
        e.dietry_restrictionsary.toLowerCase().includes(value.toLocaleLowerCase())||
        e.level.toLowerCase().includes(value.toLocaleLowerCase())
      )
      }
      else
      this.filterListAllergy=this.listalerrgys
      console.log(value);

    })
   
  }


  getAllUserAllergy(){
    this.allergieService.getAllAllergyUserV2().subscribe((data) => {
      this.listalerrgys=data
      this.filterListAllergy=data

      //console.log('data',data)
    })
  }


  updateAlergy(id_Allergy:number){

    this.allergieService.getAllergyById(id_Allergy).subscribe(
      (selectedAllergy: Allergy) => {
        this.allergy = selectedAllergy;
  
        if (this.selectedAllergy) {
          Swal.fire({
            title: 'Update Allergy',
            html: `
            <style>
            .custom-input {
              border-radius: 4px;
              border: 1px solid #ccc;
              padding: 8px;
              margin-bottom: 10px;
              width: 70%;
              box-sizing: border-box;
            }
            </style>
              <input id="name" class="swal2-input custom-input" value="${this.allergy.name}">
              <select id="level" class="swal2-input custom-input">
                <option value="Light" ${this.allergy.level === 'Light' ? 'selected' : ''}>Light</option>
                <option value="Modern" ${this.allergy.level === 'Modern' ? 'selected' : ''}>Modern</option>
                <option value="Severe" ${this.allergy.level === 'Severe' ? 'selected' : ''}>Severe</option>
              </select>
              <input id="dietry_restrictionsary" class="swal2-input custom-input" value="${this.allergy.dietry_restrictionsary}">
              <input type="date" id="date" value="${this.allergy.date}" class="form-control" placeholder="Date debut" aria-label="Username" aria-describedby="basic-addon1">

            `,
            focusConfirm: false,
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            preConfirm: () => {
              const name = (document.getElementById('name') as HTMLInputElement).value;
              const level = (document.getElementById('level') as HTMLSelectElement).value;
              const dietry_restrictionsary = (document.getElementById('dietry_restrictionsary') as HTMLSelectElement).value;
              const date = (document.getElementById('date') as HTMLInputElement).value;
              if (name.trim() === '' || name.length < 4) {
                Swal.showValidationMessage('Please enter a name.');
                return;
              }
              if (dietry_restrictionsary.trim() === ''|| dietry_restrictionsary.length <7) {
                Swal.showValidationMessage('Please enter dietary restrictions.');
                return;
              }
              
              this.allergy.name=name;
              this.allergy.level=level;
              this.allergy.dietry_restrictionsary=dietry_restrictionsary;
              this.allergy.date=date;
             
              return this.allergieService.updateAlergy(this.allergy);

            }
          }).then((result: any) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Updated!',
                'Your Allergy has been updated.',
                'success'
              );
              this.getAllUserAllergy() // Rafraîchir la liste 
              this.allergy  = null;
            }
          });
        }
      },
      (error) => {
        console.error('Error :', error);
      }
    );
  }

  deleteAlergy( id_Allergy:number){
    console.log("deleted ")
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if (result.isConfirmed){
        //Delete
        this.allergieService.deleteAlergy(id_Allergy).subscribe((res)=>
        {
          console.log("deleted ",res);
          Swal.fire(
            'Deleted!',
          'Allergy has been deleted.',
          'success'

          );
          this.getAllUserAllergy();
        });
      }                                           
    
  });
}


searchAllergie(){

    this.getAllUserAllergy();

}


}
