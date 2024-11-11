import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Feedback } from 'src/app/models/Feedback';
import { FeedbackServicesService } from 'src/app/services/feedback/feedback-services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FullFeedbackUser } from 'src/app/models/FullFeedbackUser';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent {

  feedbackTab: FullFeedbackUser[]=[];
  feedbackuser: FullFeedbackUser[]=[];
  selectedFeedback :any= Feedback; 
  fedbacka: any;
  currentPage = 1;
  id_user!: number;

  searchType: string = 'byType'; // Ajoutez une propriété pour le type de recherche
  searchTerm: string = '';
  searchResults: Feedback[] = []; // Déclaration de la variable searchResults

  constructor(
    private feedbackService: FeedbackServicesService,
    private router: Router,
    private us : UserServicesService
  ){}
  

  async ngOnInit(){
    await this.us.getCurrentUser().then(res => {
      if(res){
        this.id_user = res.id;
      }
    });
    this.getfeedback() }
  getfeedback(){
    this.feedbackService.getfeedback().subscribe((response)=>{
      this.feedbackTab=response;
      console.log(this.feedbackTab);
      
    })
  }
  

  deleteFeedback(feedbackID: number) {
    Swal.fire({
      title: 'Are you sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete feedback
        this.feedbackService.deletefeedback(feedbackID).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Your feedback has been deleted.',
            'success'
          );
          this.getfeedback();
        });
      }
    });
  }



  updatFeedback(f:number) {
    this.feedbackService.getFeedbackById(f).subscribe(
      (selectedFeedback) => {
        this.fedbacka = selectedFeedback;
  
        if (this.selectedFeedback) {
          Swal.fire({
            title: 'Update Feedback',
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
              <input id="title" class="swal2-input custom-input" value="${this.fedbacka.title}">
              <select id="status" class="swal2-input custom-input">
                <option value="Open" ${this.fedbacka.status === 'Open' ? 'selected' : ''}>Open</option>
                <option value="UnderReview" ${this.fedbacka.status === 'UnderReview' ? 'selected' : ''}>Under Review</option>
                <option value="Closed" ${this.fedbacka.status === 'Closed' ? 'selected' : ''}>Closed</option>
              </select>
              <select id="type" class="swal2-input custom-input">
                <option value="Complaint" ${this.fedbacka.type === 'Complaint' ? 'selected' : ''}>Complaint</option>
                <option value="Suggestion" ${this.fedbacka.type === 'Suggestion' ? 'selected' : ''}>Suggestion</option>
                <option value="Cheer" ${this.fedbacka.type === 'Cheer' ? 'selected' : ''}>Cheer</option>
              </select>
              <input id="description" class="swal2-input custom-input" value="${this.fedbacka.description}">
            `,
            focusConfirm: false,
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            preConfirm: () => {
              const title = (document.getElementById('title') as HTMLInputElement).value;
              const status = (document.getElementById('status') as HTMLSelectElement).value;
              const type = (document.getElementById('type') as HTMLSelectElement).value;
              const description = (document.getElementById('description') as HTMLInputElement).value;
              // Mettre à jour le feedback avec les nouvelles valeurs
              this.fedbacka.title = title;
              this.fedbacka.status = status;
              this.fedbacka.type = type;
              this.fedbacka.description = description;
              return this.feedbackService.updateFeedback(this.fedbacka).toPromise();
            }
          }).then((result: any) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Updated!',
                'Your feedback has been updated.',
                'success'
              );
              this.getfeedback(); // Rafraîchir la liste des feedbacks
              this.fedbacka  = null;
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching feedback details:', error);
      }
    );
  }

  search() {
    if (this.searchType === 'byType') {
      this.feedbackService.searchByType(this.searchTerm).subscribe(
        (results: Feedback[]) => {
          this.searchResults = results;
          if (results.length === 0) {
            console.log('Aucun résultat trouvé pour la recherche par type.');
            // Afficher un message à l'utilisateur pour informer qu'aucun résultat n'a été trouvé
          }
        },
        (error) => {
          console.error('Une erreur est survenue lors de la recherche par type :', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    } else if (this.searchType === 'byStatus') {
      this.feedbackService.searchByStatus(this.searchTerm).subscribe(
        (results: Feedback[]) => {
          this.searchResults = results;
          if (results.length === 0) {
            console.log('Aucun résultat trouvé pour la recherche par statut.');
            // Afficher un message à l'utilisateur pour informer qu'aucun résultat n'a été trouvé
          }
        },
        (error) => {
          console.error('Une erreur est survenue lors de la recherche par statut :', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }
  }
  
  refresh() {
    this.searchType = '';
    this.getfeedback;
    this.searchResults = [];
  }
  detailRestaurant(id:number ){
    this.router.navigate(['/menu/'+id]);
  }
  
}

