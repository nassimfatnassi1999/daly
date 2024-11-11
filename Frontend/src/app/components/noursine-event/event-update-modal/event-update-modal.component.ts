import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventservicesService } from '../../../services/event/eventservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UEvent } from 'src/app/models/UEvent';

@Component({
  selector: 'app-event-update-modal',
  templateUrl: './event-update-modal.component.html',
  styleUrls: ['./event-update-modal.component.css']
})
  export class EventUpdateModalComponent implements OnInit {
    updatedEvent: UEvent;
    updatedEventData!: UEvent;

    eventId!: number;
    events: UEvent[] = [];
    
  
    constructor(private cdr: ChangeDetectorRef, 
                private route: ActivatedRoute, 
                private router: Router, 
                private eventService: EventservicesService,
                public dialogRef: MatDialogRef<EventUpdateModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { updatedEvent: UEvent }
                ) 
                {
                  this.updatedEvent = data.updatedEvent;
                }
  
                ngOnInit(): void {
                  if (this.data && this.data.updatedEvent) {
                    this.updatedEvent = this.data.updatedEvent;
                    this.eventId = this.updatedEvent.id_event;
                    console.log('Updated Event ID:', this.eventId);
                  }
                 else {
                  console.error('Event ID is not provided.');
                }
                    // Use this ID to retrieve the event details to be updated
                    this.eventService.getEventById(this.eventId).subscribe(event => {
                      // Modify the object creation to include the user property
                      this.updatedEventData = {
                        id_event: event.id_event,
                        title: event.title,
                        location: event.location,
                        type: event.type,
                        topic: event.topic,
                        image: event.image,
                        date: event.date,
                        user: event.user,
                        user_id: event.user_id // Include the user_id property
                      };
                    });
                  
                }
                getAllEvents(): void {
                  this.eventService.getAllEvents().subscribe(
                    (events: UEvent[]) => {
                      // Assign the retrieved events to the local events array
                      this.events = events;
                      console.log(events); // Optional: Log the retrieved events
                    },
                    (error: any) => {
                      console.error('Error fetching events:', error);
                      // Optionally, handle the error (e.g., display an error message)
                    }
                  );
                }
                
              
                updateEvent(eventId: number) {
                  this.eventService.getEventById(eventId).subscribe(
                    (selectedEvent) => {
                      if (selectedEvent) {
                        Swal.fire({
                          title: 'Update Event',
                          focusConfirm: false,
                          inputAttributes: {
                            autocapitalize: 'off',
                            autocorrect: 'off'
                          },
                          preConfirm: () => {
                            const title = (document.getElementById('title') as HTMLInputElement).value;
                            const topic = (document.getElementById('topic') as HTMLInputElement).value;
                            const date = (document.getElementById('date') as HTMLInputElement).value;
                            const location = (document.getElementById('location') as HTMLInputElement).value;
                            const type = (document.getElementById('type') as HTMLSelectElement).value;
                
                            // Update the event object with the new values
                            selectedEvent.title = title;
                            selectedEvent.topic = topic;
                            selectedEvent.date = date;
                            selectedEvent.location = location;
                            selectedEvent.type = type;
                
                            // Call the service method to update the event in the database
                            return this.eventService.modifyEvent(selectedEvent.id_event, selectedEvent).toPromise();
                          }
                        }).then((result: any) => {
                          if (result.isConfirmed) {
                            // Show a success message if the update is confirmed
                            Swal.fire(
                              'Updated!',
                              'Your event has been updated.',
                              'success'
                            );
                            // Refresh the list of events after successful update
                            this.getAllEvents();
                          }
                        });
                      }
                    },
                    (error) => {
                      console.error('Error fetching event details:', error);
                    }
                  );
                }
                
              
                closeModal() {
                  // Add logic to close the modal
                  this.dialogRef.close();
                }
                getTodayDate(): string {
                  const today = new Date();
                  const year = today.getFullYear();
                  const month = (today.getMonth() + 1).toString().padStart(2, '0');
                  const day = today.getDate().toString().padStart(2, '0');
                  return `${year}-${month}-${day}`;
                }
  }
