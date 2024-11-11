import { Component } from '@angular/core';
import { Allergy } from 'src/app/models/Allergy';
import { FullResponse } from 'src/app/models/FullResponse';
import { User } from 'src/app/models/User';
import { AllergieServicesService } from 'src/app/services/allergie/allergie-services.service';
import Swal from 'sweetalert2';
import { AdminComponent } from '../../admin/admin.component';
import { UserServicesService } from 'src/app/services/user/user-services.service';
@Component({
  selector: 'app-detail-allergie',
  templateUrl: './detail-allergie.component.html',
  styleUrls: ['./detail-allergie.component.css']
})
export class DetailAllergieComponent {

  allergieTab: Allergy[] =[
    //  {name: "achref", level:"Light", dietry_restrictionsary:"string", date:"2024-04-01" },
  ];

  allergyUser: FullResponse[]=[];
  //userr static
  userId!: number;
  allergy:any;
  selectedAllergy:any=Allergy;
    
  
  constructor(
    private allergieService:  AllergieServicesService,
    private us : UserServicesService
  
  ) { }
 
  
  async ngOnInit() {
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.userId = user.id;
      }
    })
    this.getAllergybyUser(this.userId);
  }


  getAllergybyUser(id: number) {
    this.allergieService.getAllergyByuser(id).subscribe((res: any) => {
      console.log('Response:', res);
      if (res.alerrgys && Array.isArray(res.alerrgys)) {
        this.allergyUser = [{
          user: res.user,
          listAllergy: res.alerrgys
          
        }];
      }
      console.log('hhh',this.allergyUser)
    });
   
  }
  
    

// us!:User;
    getAllergy(){
      this.allergieService.getAllergie().subscribe((response)=>{
        this.allergieTab = response
      })
      
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
            this.getAllergybyUser(this.userId);
          });
        }                                           
      
    });
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
              this.getAllergybyUser(this.userId) // Rafraîchir la liste 
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


}
