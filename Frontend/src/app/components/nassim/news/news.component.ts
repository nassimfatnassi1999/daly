import { Component } from '@angular/core';
import { News } from 'src/app/models/News';
import { NewswithURL } from 'src/app/models/NewswithURL';
import { NewServicesService } from 'src/app/services/news/new-services.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  newsTab : NewswithURL [ ] = [];

   currentUser!:number; // Pour le moment on est connecté en tant que l'utilisateur n°1
   selectedNews: any; 
   selectNews(news: any) {
       this.selectedNews = news; 
   }
   
  constructor(
    private us : UserServicesService,
    private newService : NewServicesService,
  ) { }

  async ngOnInit() {
    //par defaut les News Afficher lors de la loncement de serveur
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.currentUser = user.id;
      }
    })
    this.getAllNews();
  }

updatePage(event: any) {
  this.p = event.pageIndex + 1;
}

  getAllNews(){
    this.newService.getAllNews().subscribe((data)=>{
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
          this.getAllNews();//on actualise le tableau apres suppression
        });
      }                                           
    
  });
  }
 // Méthode pour vérifier si l'élément est nouveau ou ancien
 isNewItem(date: Date): boolean {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  return new Date(date) > twoDaysAgo;
}

p: number = 1; // Initialisez la variable p pour la pagination
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




}