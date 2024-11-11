import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { News } from 'src/app/models/News';
import { NewServicesService } from 'src/app/services/news/new-services.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {



  newsForm!: FormGroup;
  selectedFile: File | null = null;
  id_user!:number;

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private newService: NewServicesService,
    private us : UserServicesService
  ) {}

  async ngOnInit() {
   
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
      image: ['', Validators.required],
    });
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.id_user = user.id;
      }
    })
    
  }


  addNewsBtn() {
    console.log(this.newsForm.value);
    
    if (this.newsForm.valid && this.selectedFile) {
      const newNews: News = this.newsForm.value as News;
      newNews.user_id = this.id_user;
      newNews.image = this.selectedFile;
  
      // Vérifier si un badword a été détecté
      this.newService.checkBadWord(newNews).subscribe(
        (badWordDetected: boolean) => {
          if (badWordDetected) {
            // Afficher un message d'erreur si un badword est détecté
            Swal.fire({
              icon: 'error',
              title: 'Bad word detected',
              text: 'Your news contains inappropriate language. Please review and try again.',
            });
          } else {
            // Envoyer la demande d'ajout de news avec l'image
            this.newService.addNewsWithImage(newNews.title, newNews.comment, newNews.user_id, newNews.image)
              .subscribe(
                (error: any) => {
                  console.error("Error:", error);
                  if (error instanceof HttpErrorResponse && error.status === 400 && error.error === 'Bad word detected. News not added.') {
                    // Afficher un message d'erreur spécifique pour la détection de badword
                    Swal.fire({
                      icon: 'error',
                      title: 'Bad word detected',
                      text: 'Your news contains inappropriate language. Please review and try again.',
                    });
                  } else {
                    // Afficher un message d'erreur générique pour les autres erreurs
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                    });
                  }
                },
                (res) => {
                  console.log("Response from backend", res);
                  // Afficher un message de succès
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              );
          }
        },
        (error) => {
          console.error("Error:", error);
          // Afficher un message d'erreur générique en cas d'erreur lors de la vérification de badword
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    } else {
      // Afficher un message d'erreur si le formulaire est invalide ou s'il manque un fichier
      Swal.fire({
        icon: 'error',
        title: 'Form error',
        text: 'Please fill all required fields and select an image.',
      });
    }
  }
  
    
}
