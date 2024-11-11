import { Component } from '@angular/core';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  adminName!: string;
  selectedTab : string = 'dashboard'
  constructor(private us : UserServicesService, private router : Router){}
  async ngOnInit(){
    const res = await this.us.getAdminDetails().then(res => {
      this.adminName = res
      console.log("admin name:" + this.adminName);
    });
    
    
  }
  getAdminName(){
    return this.adminName;
  }
  logOut(){
    this.us.logout();
    this.router.navigate(['/']);
  }

  changeTab(tabName: string){
    this.selectedTab = tabName;
  }

}
