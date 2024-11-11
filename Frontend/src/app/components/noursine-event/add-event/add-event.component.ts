import { Component } from '@angular/core';
import { EventservicesService } from 'src/app/services/event/eventservices.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextFilterService } from 'src/app/services/event/text-filter.service';
import {  Router } from '@angular/router';





@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

export class AddEventComponent {

  // Form ID
  eventForm!: FormGroup;
  eventDate!: string;
  minDate: string;
  id_user: number = 1;
  router: any;

    constructor(
      private formBuilder: FormBuilder,
      private eventService: EventservicesService,
      private textFilterService: TextFilterService,
      private rt : Router
    ) {  const today = new Date();
      this.minDate = today.toISOString().split('T')[0];}
  
    ngOnInit() {
        // nheb nkolo hadharli melowel win bch nhot les données
      this.eventForm = this.formBuilder.group({
        title: ['', Validators.required],
        topic: ['', Validators.required],
        date: ['', Validators.required],
        type: ['', Validators.required],
        location: ['', Validators.required],
        image: ['']
      });
    }
  
    addEvent() {
      if (this.eventForm.valid) {
         // Filtrer le titre et le sujet de l'événement
      const title = this.textFilterService.filterText(this.eventForm.value.title);
      const topic = this.textFilterService.filterText(this.eventForm.value.topic);
        // Utiliser les valeurs filtrées pour créer le corps de la requête
        const body = { ...this.eventForm.value,  title: title, topic: topic,id_user: this.id_user }
        this.eventService.addEventWithImage(body, this.eventForm.value.image)
          .subscribe(
            (error) => {
              console.log('errorr', error);
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops",
                text: 'Something went wrong!'
              })
            },
            (response) => {
              console.error('Error adding event', response);
              Swal.fire({
                icon: "success",
                title: "your event has been saved ",
                showCancelButton: false,
                timer: 1000
              })
            }
          );  this.rt.navigate(['/admin'])
      } else {
        // Marquer tous les champs comme touchés pour activer la validation et afficher les messages d'erreur
        this.eventForm.markAllAsTouched();
      }
    }
    
   
 
    onFileSelected(event: any) {
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        this.eventForm.patchValue({
          image: file
        });
      }
    }}