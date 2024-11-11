import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackServicesService } from 'src/app/services/feedback/feedback-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {
  feedbackform!: FormGroup;
  router: any;
  id_restaurant:any;
  id_user!: number;
 
  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackServicesService,
    private route: ActivatedRoute,
    private us : UserServicesService,
    private rt : Router
  ){}
  async ngOnInit(){
    
    this.feedbackform = this.formBuilder.group({
      title:["",Validators.required],
      description:["",Validators.required],
      status:["Open",Validators.required],
      type:["",Validators.required],
      id_restaurant:[""],
      user_id:1
    })
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.id_user = user.id;
      }
    })
    this.feedbackform.patchValue({
      user_id: this.id_user
    })
    this.route.params.subscribe(params => {
      // Extract the ID from route parameters
      this.id_restaurant = params['id_restaurant'];
    });
  }

  addfeedback(){

const body = {...this.feedbackform.value, id_restaurant: this.id_restaurant}

   ////////////////////////
      // Ajouter un feedback et afficher le toast après succès
      this.feedbackService.addfeedback(body,this.id_restaurant).subscribe((response) => {
        // Afficher le toast après un ajout réussi
        this.Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        });    
        this.rt.navigate(['/usercrud-feedback'])
      },
      (error) => {
        console.error("Error adding feedback:", error); // Gestion des erreurs
        this.Toast.fire({
         icon: "error",
         title: "Failed to add feedback"
        });
      }
    );

  }
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
}
