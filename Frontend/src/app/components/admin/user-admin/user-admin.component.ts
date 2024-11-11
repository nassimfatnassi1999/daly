import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../../register-form/register-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent {
  users : User[] = [];
  constructor(private us : UserServicesService, private dialog: MatDialog){}
  ngOnInit(){
    this.us.getAllUsers().subscribe(res => {
      this.users = res;
    })
  }

  addUser(){
    this.dialog.open(RegisterFormComponent, {
      width: '550px',
      disableClose: false,
      data: {
        isAdmin: true
      }
    });
  }

  changePassword(id: number){
    this.us.adminResetPassword(id);
  }

  deleteUser(id: number){
    this.us.adminDeleteUser(id).subscribe({
      next: res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: res => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        console.log(res);
      }
    })
  }

}
