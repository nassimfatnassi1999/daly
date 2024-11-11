import { Component } from '@angular/core';
import { Feedback } from 'src/app/models/Feedback';
import { FeedbackServicesService } from 'src/app/services/feedback/feedback-services.service';

@Component({
  selector: 'app-find-feedback',
  templateUrl: './find-feedback.component.html',
  styleUrls: ['./find-feedback.component.css']
})
export class FindFeedbackComponent {
  searchType: string = 'byType';
  searchTerm: string = '';
  searchResults: Feedback[] = []; // Utilisez le type Feedback pour les résultats de la recherche

  constructor(private rechercheService: FeedbackServicesService) { }

  search() {
    if (this.searchType === 'byType') {
      this.rechercheService.searchByType(this.searchTerm).subscribe(
        (results: Feedback[]) => { // Utilisez le type Feedback pour les résultats de la recherche
          this.searchResults = results;
        },
        (error) => {
          console.error('Une erreur est survenue lors de la recherche par type :', error);
        }
      );
    } else if (this.searchType === 'byStatus') {
      this.rechercheService.searchByStatus(this.searchTerm).subscribe(
        (results: Feedback[]) => { // Utilisez le type Feedback pour les résultats de la recherche
          this.searchResults = results;
        },
        (error) => {
          console.error('Une erreur est survenue lors de la recherche par statut :', error);
        }
      );
    }
  }
}
