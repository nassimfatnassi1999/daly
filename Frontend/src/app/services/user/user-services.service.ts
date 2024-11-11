import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { map, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  readonly myUrl: string = "http://localhost:9090/user";
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  async getCurrentUser(): Promise<User | undefined> {
    if(this.isLoggedIn()){
      try {
        const response = await this.http.post<any>(this.myUrl + "/getbytoken", localStorage.getItem('token')).toPromise();
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.logout();
          //this.showLoginPopup();
        }
        return undefined;
      }
    }
    return undefined;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token',token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout(){
    localStorage.removeItem('token');
  }

  forgetPassword(email: string){
    console.log(email);
    
    this.http.post<any>(this.myUrl + "/resetpasswordrequest", email).subscribe({
      next: Response => {
        console.log(Response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 700
        });
      },
      error: Response => console.log(Response)
    });
  }

  resetPassword(token: string, password: string){
    const body = { token: token, password: password };
    this.http.post<any>(this.myUrl + "/resetpassword", body).subscribe({
      next: Response => {
        console.log(Response)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Password reset successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        this.dialog.closeAll();
      },
      error: Response => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(Response)
      }
    });
  }

  login(username: string, password: string) {
    const body = { username: username, password: password };
    return this.http.post<any>(this.myUrl + "/authenticate_user", body).pipe(
        tap(response => {
          if(response.status == 200){
            localStorage.setItem('token', response.token);
            Swal.fire({
              position: "top-end",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.dialog.closeAll();
          }else{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Wrong email or password",
              showConfirmButton: false,
              timer: 500
            });
            throw new Error(response.message);
          }
        })
      );
  }

  register(firstName: string,
           lastName: string,
           email: string,
           password: string,
           role: string,
           preferences: string,
           isAdmin: boolean
          ){
    const body = {
      id: 0,firstName, lastName, email, password, role, preferences
    }
    return this.http.post<any>(this.myUrl + "/register_user", body).pipe(
      tap(response => {
        if(response.status == 201){
          console.log("is admin: " + isAdmin);
          
          if(isAdmin){
            this.dialog.closeAll();
            return;
          }
          localStorage.setItem('token', response.token);
        }else{
          throw new Error(response.message);
        }
      }));
    }

    getAllUsers(){
      return this.http.get<User[]>(this.myUrl + "/getAllUsers");
    }

    adminResetPassword(id : number){
      this.http.post<any>(this.myUrl + "/admin/resetpassword", id).subscribe({
        next: res => {
          console.log(res);
          this.dialog.open(ResetPasswordComponent, {
            width: '550px',
            disableClose: false,
            data: { token: res.token }
          });
        },
        error: res => console.log(res)    
      });
    }
    adminDeleteUser(id: number){
      return this.http.delete(this.myUrl + "/admin/delete_user/" + id);
    }

    async getAdminDetails() : Promise<string>{
      let name = "";
      const response = await this.http.post<any>(this.myUrl + "/admin/getbytoken",this.getToken()).toPromise();
      name = response.name;
      return name;
    }
}

