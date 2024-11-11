import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event';
import { UEvent } from 'src/app/models/UEvent';

@Injectable({
  providedIn: 'root'
})
export class EventservicesService {

  eventURL: string = "http://localhost:9090/apinoursine/event"; 
  constructor(private httpClient: HttpClient) { }
  
addEventWithImage(event:any, image:File): Observable<any> {
  const formData = new FormData();
  formData.append('title', event.title);
  formData.append('topic', event.topic);
  formData.append('date', event.date);
  formData.append('type', event.type);
  formData.append('location', event.location);
  formData.append('image', image);
  formData.append('id_user',event.id_user);
  console.log(event);
  
  return this.httpClient.post(`${this.eventURL}/addEvent`, formData);
}


getAllEvents(): Observable<UEvent[]> {
  return this.httpClient.get<UEvent[]>(`${this.eventURL}/getall` );
}
deleteEvent(id: number) {
  return this.httpClient.delete<any>(`${this.eventURL}/delete/${id}`);
}

modifyEvent(id: number, updatedEvent: Event) {
  const url = `${this.eventURL}/updateevent/${id}`;
  return this.httpClient.put<Event>(url, updatedEvent);
}


getEventById(id: number): Observable<Event> {
  return this.httpClient.get<Event>(`${this.eventURL}/getevent/`+id);
}

}

