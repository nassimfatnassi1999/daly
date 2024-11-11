import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private us : UserServicesService,private router: Router){}
  username = new FormControl('',[Validators.required,Validators.email])
  password = new FormControl('',[Validators.required,Validators.minLength(8)])
  login(){
    if(this.username.invalid){
      Swal.fire({
        icon: "error",
        text: "Your email is wrong!",
      });
      return;
    }
    if(this.password.invalid){
      Swal.fire({
        icon: "error",
        text: "The password needs to be at least 8 characters!",
      });
      return;
    }
    if(this.username.value && this.password.value ){
      this.us.login(this.username.value , this.password.value).subscribe({
            next: (response) => {
              console.log(response);
              if(response && response.role=="ADMIN"){
                this.router.navigate(["/admin"]);
              }else{
                this.router.navigate(["/"]);
              }
              
            },
            error: (error) => {
              console.log(error)
              Swal.fire({
                icon: "error",
                title: "Wrong!",
                timer: 1500,
                showConfirmButton: false,
              });
              //display error
            }
          });
    }
  }
  forgotPassword(){
    if(this.username.invalid){
      Swal.fire({
        icon: "error",
        text: "Your email is wrong!",
      });
      return;
    }
    if(this.username.valid && this.username.value){
      this.us.forgetPassword(this.username.value);
    }
  }
}
