import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { News } from 'src/app/models/News';
import { NewswithURL } from 'src/app/models/NewswithURL';
import { NewswithUsers } from 'src/app/models/NewsWithUser';
import { StatBadWord } from 'src/app/models/StatBadWord';

@Injectable({
  providedIn: 'root'
})
export class NewServicesService {

  
  newsURL: string = "http://localhost:9090/news"; 




  constructor(private httpClient: HttpClient) {}

  getAllNews(): Observable<NewswithURL[]> {
    return this.httpClient.get<NewswithURL[]>(`${this.newsURL}/getAll`);
  }

  getAllNewsWithUsers(): Observable<NewswithUsers[]> {
    return this.httpClient.get<NewswithUsers[]>(`${this.newsURL}/getAllNewsWithUsers`);
  }
  
  addNewsWithImage(title: string, comment: string, userId: number, imageFile: File) {     
    const formData = new FormData();
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('user_id', userId.toString());
    formData.append('image', imageFile); 
    return this.httpClient.post(`${this.newsURL}/addNews`, formData);
}

 deleteNews(id : Number){
  return this.httpClient.delete(`${this.newsURL}/delete/${id}`);
 };
   

 checkBadWord(n :News) :Observable<boolean> {
  return this.httpClient.post<boolean>(`${this.newsURL}/checkBadWord`,n);
 }
 
 statistics(): Observable<StatBadWord[]> {
  return this.httpClient.get<StatBadWord[]>(`${this.newsURL}/getAllStat`);
}

statisticsByUser(id: number): Observable<StatBadWord> {
  return this.httpClient.get<StatBadWord>(`${this.newsURL}/getStatByUser/${id}`);
}

}
