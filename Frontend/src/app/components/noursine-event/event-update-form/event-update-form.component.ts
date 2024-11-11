import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventservicesService } from 'src/app/services/event/eventservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-update-form',
  templateUrl: './event-update-form.component.html',
  styleUrls: ['./event-update-form.component.css']
})
export class EventUpdateFormComponent implements OnInit {
   eventId!: number;
  updatedEvent!: Event;
 // eventForm!: FormGroup; 
  

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router :Router,private eventService: EventservicesService) { }

  ngOnInit(): void {
    
    
    // Récupérer l'ID de l'événement à partir des paramètres de route
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      // Utilisez cet ID pour récupérer les détails de l'événement à mettre à jour
      this.eventService.getEventById(this.eventId).subscribe(event => {
        this.updatedEvent = { ...event };
        console.log("Événement récupéré :", this.updatedEvent);
        this.cdr.detectChanges();
      });
    });
  }

  updateEvent() {
    // Appelez la méthode du service pour mettre à jour l'événement avec les données mises à jour
    this.eventService.modifyEvent(this.eventId, this.updatedEvent).subscribe(updatedEvent => {
      console.log('Événement mis à jour avec succès :', updatedEvent);
      this.gotoliste();
      Swal.fire({
        icon: "success",
        title:"your event has been updated ",
        showCancelButton:false,
        timer: 1000})

      // Gérer la réussite de la mise à jour, par exemple, naviguer vers une autre page
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
      // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      Swal.fire({
        icon: "error",
        title:"Ooops ",
        showCancelButton:false,
        timer: 1000})
    });
  }
  // goBack(): void {
  //   this.router.navigate(['/admin']);
  // }
  gotoliste(){
    this.router.navigate(['/admin']);
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    const day = today.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    return `${year}-${month}-${day}`;
  }

  
  
  
}

