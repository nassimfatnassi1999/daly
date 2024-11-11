import { Component } from '@angular/core';
import { NewswithUsers } from 'src/app/models/NewsWithUser';
import { NewswithURL } from 'src/app/models/NewswithURL';
import { StatBadWord } from 'src/app/models/StatBadWord';
import { NewServicesService } from 'src/app/services/news/new-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent {
  newsTab : NewswithUsers [ ] = [];


  constructor(
 
    private newService : NewServicesService,
  ) { }

  ngOnInit() {
    //par defaut les News Afficher lors de la loncement de serveur
    this.getAllNewsWithUsers();
  }




  getAllNewsWithUsers(){
    this.newService.getAllNewsWithUsers().subscribe((data)=>{
      this.newsTab= data;
      console.log(this.newsTab);
    })
  }

  deleteNews(id:number){
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
        this.newService.deleteNews(id).subscribe((res)=>
        {
          console.log("deleted ",res);
          Swal.fire(
            'Deleted!',
          'News has been deleted.',
          'success'

          );
          this.getAllNewsWithUsers();//on actualise le tableau apres suppression
        });
      }                                           
    
  });
  }

  showCardDetails(item: any) {
    Swal.fire({
        title: item.title,
        text: item.comment,
        imageUrl: item.image.imageURL, 
        imageWidth: 400, 
        imageHeight: 200, 
        imageAlt: 'Custom image', 
  
    });
  }
  /**************************** */
  
  
}
