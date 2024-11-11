import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UEvent } from 'src/app/models/UEvent';
import { Event } from 'src/app/models/event';
import { EventservicesService } from 'src/app/services/event/eventservices.service';
import { EventUpdateModalComponent } from '../event-update-modal/event-update-modal.component';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  searchTerm: string = "";
  events : UEvent []=[];
  constructor(private eventService: EventservicesService, 
              private router :Router) { }

  ngOnInit(): void {
    this.getAllEvents();
  }
  
  getAllEvents(): void {
    this.eventService.getAllEvents()
      .subscribe(events => {
        this.events = events;
        console.log(events);
        
      });
  }
  p:number=1;
  gotodetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  get filteredEvents(): UEvent[] { // Spécifier le type de retour de la fonction
    if (!this.searchTerm) {
      return this.events; // Retourner tous les événements si aucun terme de recherche n'est saisi
    }
    return this.events.filter(event => {
      const searchTerm = this.searchTerm.toLowerCase();
      return Object.values(event).some(value =>
        value && typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      );
    });
  }
  
  
}




