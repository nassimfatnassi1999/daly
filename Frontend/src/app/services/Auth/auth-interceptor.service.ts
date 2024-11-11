import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { Router } from '@angular/router';
import { UserServicesService } from '../user/user-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private dialog: MatDialog, private router: Router, private us : UserServicesService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });


    return next.handle(req1).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.showLoginPopup();
          this.us.logout();
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
    
  }
  private showLoginPopup(): void {
    this.dialog.open(LoginFormComponent, {
      width: '500px',
      height:'800px',
      disableClose: true,
      data: { message: 'Session expired. Please log in again.' }
    });
  }
}
