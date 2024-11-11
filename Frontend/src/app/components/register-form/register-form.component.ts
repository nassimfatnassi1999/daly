import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  isAdmin: boolean = false;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private us : UserServicesService,private router: Router){
    if(data && data.isAdmin){
      this.isAdmin = true;
      console.log(this.isAdmin);
      
    }
  }
  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    preferences: new FormControl(''),
  });
  
  register(){
    if(this.registerForm.get('email')?.invalid){
      Swal.fire({
        icon: "error",
        text: "Your email is wrong!",
      });
      return;
    }
    if(this.registerForm.get('password')?.invalid){
      Swal.fire({
        icon: "error",
        text: "The password needs to be at least 8 characters!",
      });
      return;
    }
    if(this.registerForm.get('firstName')?.invalid){
      Swal.fire({
        icon: "error",
        text: "The firstName needs to be at least 3 characters!",
      });
      return;
    }
    if(this.registerForm.get('lastName')?.invalid){
      Swal.fire({
        icon: "error",
        text: "The lastName needs to be at least 3 characters!",
      });
      return;
    }
    if(this.registerForm.get('preferences')?.invalid){
      Swal.fire({
        icon: "error",
        text: "Type some preferences!",
      });
      return;
    }
    const emailValue = this.registerForm.get('email')?.value;
    const passwordValue = this.registerForm.get('password')?.value;
    const firstNameValue = this.registerForm.get('firstName')?.value;
    const lastNameValue = this.registerForm.get('lastName')?.value;
    const preferencesValue = this.registerForm.get('preferences')?.value;
    if (emailValue && passwordValue && firstNameValue && lastNameValue && preferencesValue) {      
      this.us.register(firstNameValue,lastNameValue,emailValue,passwordValue,"USER",preferencesValue,this.isAdmin).subscribe({
        next: (response) => {
          console.log(response);
          console.log("isAdmin: " + this.isAdmin);
          if(response.status == 201){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Account created successfully.",
              showConfirmButton: false,
              timer: 1500
            });
            if(!this.isAdmin){
              this.router.navigate(["/"]);
            }
          }    
        },
        error: (error) => {
          console.log(error)
        }
      });
    }else{
      console.log("Invalid values");
    }
    
  }
}
