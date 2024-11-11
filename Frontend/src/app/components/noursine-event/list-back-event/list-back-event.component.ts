import { Component } from '@angular/core';
import { Event } from 'src/app/models/event';
import Swal from 'sweetalert2';
import { EventservicesService } from 'src/app/services/event/eventservices.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UEvent } from 'src/app/models/UEvent';
import { AdminComponent } from '../../admin/admin.component';
import { EventUpdateModalComponent } from '../event-update-modal/event-update-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-back-event',
  templateUrl: './list-back-event.component.html',
  styleUrls: ['./list-back-event.component.css']
})
export class ListBackEventComponent {
types = ['NewMenuIdea', 'CulinaryEvent', 'Tasting', 'SeasonalPromotion', 'Awareness', 'Other'];
searchTerm: string = "";
events : UEvent []=[];
 
  constructor( private router :Router,
               private route :ActivatedRoute, 
               private eventService: EventservicesService,
               private sletctecTabe:AdminComponent,
               public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEvents();
   
  }
  changeTab(tabName: string){
    this.sletctecTabe.changeTab;
  }

  openUpdateModal(eventId: number): void {
    const eventToUpdate = this.events.find(event => event.id_event === eventId);
    const dialogRef = this.dialog.open(EventUpdateModalComponent, {
      width: '500px',
      data: { updatedEvent: eventToUpdate }
    });
  }
  
  getAllEvents(): void {
    this.eventService.getAllEvents()
      .subscribe(events => {
        this.events = events;
        console.log(events);
        
      });
  }
  
  
  p:number=1;// Initialisez la variable p pour la pagination

  deleteEvent(id: number) {
    console.log("deleted ")
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#94cd2d',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Yes, delete it!'
      }).then((result)=>{
        if (result.isConfirmed){
    this.eventService.deleteEvent(id).subscribe((res)=>
      {
        console.log("deleted ",res);
        this.getAllEvents();

        Swal.fire(
          'Deleted!',
        'Event has been deleted.',
        'success'

        );
        this.getAllEvents();
              });
        }                                           
      
    });
  }
  showEventDetails(event: UEvent) {
    Swal.fire({
      title: 'Event Details',
      html: `
        <div class="event-details">
          <div class="detail">
            <span class="label" style="color: #94cd2d; font-weight: bold;">Title:</span>
            <span class="value">${event.title}</span>
          </div>
          <div class="detail">
            <span class="label" style="color: #94cd2d; font-weight: bold;">Topic:</span>
            <span class="value">${event.topic}</span>
          </div>
          <div class="detail">
            <span class="label" style="color: #94cd2d; font-weight: bold;">Type Event:</span>
            <span class="value">${event.type}</span>
          </div>
          <div class="detail">
            <span class="label" style="color: #94cd2d; font-weight: bold;">Date:</span>
            <span class="value">${event.date}</span>
          </div>
          <div class="detail">
            <span class="label" style="color: #94cd2d; font-weight: bold;">Location:</span>
            <span class="value">${event.location}</span>
          </div>
        </div>
      `,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        container: 'custom-swal-container'
      }
    });
  }
  

  
}
  
