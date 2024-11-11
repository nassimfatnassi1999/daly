import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/Feedback';
import { FullFeedbackUser } from 'src/app/models/FullFeedbackUser';
import { FullResFeedback } from 'src/app/models/FullResFeedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServicesService {
  feedbackURL: string="http://localhost:9090/feedback"

  constructor(private httpClient:HttpClient) { }
  
  addfeedback(feedbackObj:any,id_restaurant:any){
    console.log(feedbackObj)
    return this.httpClient.post(`${this.feedbackURL}/add/${feedbackObj.id_restaurant}`,feedbackObj,id_restaurant);
    
  }

  getfeedback(){
    return this.httpClient.get<FullFeedbackUser[]>(this.feedbackURL+"/getall")
  }

  deletefeedback(feedbackID : number){
    return this.httpClient.delete(`${this.feedbackURL}/delete/${feedbackID}`);
  }

  updateFeedback(feedback: Feedback) {
    return this.httpClient.put(this.feedbackURL + "/update", feedback, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  getFeedbackById(feedbackID: number): Observable<Feedback> {
   
    return this.httpClient.get<Feedback>(`${this.feedbackURL}/getbyid/${feedbackID}`);
  }
  searchByType(type: string): Observable<Feedback[]> {
    const url = `${this.feedbackURL}/getFeedBackByType/${type}`;
    return this.httpClient.get<Feedback[]>(url);
  }

  searchByStatus(status: string): Observable<Feedback[]> {
    const url = `${this.feedbackURL}/status/${status}`;
    return this.httpClient.get<Feedback[]>(url);
  }
  getfeedbackByuser(id:number){
    return this.httpClient.get<FullResFeedback[]>(`${this.feedbackURL}/getFullResponse/${id}`)
  }


}
