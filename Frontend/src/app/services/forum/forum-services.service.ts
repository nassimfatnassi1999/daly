import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumPost } from 'src/app/models/ForumPost';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumServicesService {

  forumURL: string ="http://localhost:9090/api/Post";
  commURL: string ="http://localhost:9090/api/Commentaire";
  reportURL: string ="http://localhost:9090/api/Report";


  constructor(
    private httpClient: HttpClient
  ) {}
  

  
  getForum(){
    console.log("bonjour")
    return this.httpClient.get<ForumPost[]>(this.forumURL+ "/getall");
    
  }

 
  getCommentsCountForPost(postId: number): Observable<number> {
    const url = `${this.commURL}/getCommentsCount/${postId}`;
    return this.httpClient.get<number>(url);
  }

  getReportsCountForPost(postId: number): Observable<number> {
    const url = `${this.reportURL}/getReportsCount/${postId}`;
    return this.httpClient.get<number>(url);
  }


  getLikesCountForPost(postId: number): Observable<number> {
    const url = `${this.forumURL}/getLikesCount/${postId}`;
    return this.httpClient.get<number>(url);
  }
  getDislikesCountForPost(postId: number): Observable<number> {
    const url = `${this.forumURL}/getDislikesCount/${postId}`;
    return this.httpClient.get<number>(url);
  }
  getLatestPosts(): Observable<ForumPost[]> {
    const url = `${this.forumURL}/getLatestPosts`; 
    return this.httpClient.get<ForumPost[]>(url);
  }

  getPostById(postId: number): Observable<ForumPost> {
    const url = `${this.forumURL}/getId/${postId}`;
    return this.httpClient.get<ForumPost>(url);
  }

  getCommentsForPost(postId: number): Observable<Comment[]> {
    const url = `${this.commURL}/getPostComments/${postId}`;
    return this.httpClient.get<Comment[]>(url);
  }

  saveComment(commentData: any, postId: number): Observable<any> {
    const url = `${this.commURL}/addP/${postId}`; 
    return this.httpClient.post<any>(url, commentData);
} 



uploadPhoto(formData: FormData): Observable<any> {
  return this.httpClient.post<any>(this.forumURL + '/upload-photo', formData);
}

addPost(post: ForumPost): Observable<any> {
  console.log('Attempting to add post:', post); // Log the post data before adding it
  return this.httpClient.post<any>(this.forumURL + '/add', post);
}



likePost(postId: number, userId: number): Observable<any> {
  const url = `${this.forumURL}/like/${postId}/${userId}`;
  return this.httpClient.post<any>(url, {});
}

unlikePost(postId: number, userId: number): Observable<any> {
  const url = `${this.forumURL}/unlike/${postId}/${userId}`;
  return this.httpClient.post<any>(url, {});
}
isPostLikedByUser(postId: number, userId: number): Observable<boolean> {
  const url = `${this.forumURL}/${postId}/isLikedBy/${userId}`;
  return this.httpClient.get<boolean>(url); 
}

dislikePost(postId: number, userId: number): Observable<any> {
  const url = `${this.forumURL}/dislike/${postId}/${userId}`;
  return this.httpClient.post<any>(url, {});
}

isPostDislikedByUser(postId: number, userId: number): Observable<boolean> {
  const url = `${this.forumURL}/${postId}/isDeslikedBy/${userId}`;
  return this.httpClient.get<boolean>(url);
}
undislikePost(postId: number, userId: number): Observable<any> {
  const url = `${this.forumURL}/unDeslike/${postId}/${userId}`;
  return this.httpClient.post<any>(url, {});
}

addReport(userId: number, postId: number, reason: string): Observable<any> {
  const url = `${this.reportURL}/AddReportAndAssignToUserAndPost/${userId}-${postId}`;
  return this.httpClient.post<any>(url, { reason }).pipe(
    map((response: any) => {
      return response.reportId; 
    })
  );
}
/* addReport(postId: number, reason: string): Observable<any> {
  const userId = 125; 
  const url = `${this.reportURL}/AddReportAndAssignToUserAndPost/${userId}-${postId}`;
  return this.httpClient.post<any>(url, { reason }).pipe(
    map((response: any) => {
      return response.reportId; 
    })
  );
} */
deleteReport(postId: number, userId: number): Observable<any> {
  // First, fetch the report ID
  return this.findReportBy(postId, userId).pipe(
    switchMap((reportId: number) => {
      // If reportId is null or undefined, return an empty observable

      // If reportId is available, call the deleteReport method with the retrieved reportId
      const url = `${this.reportURL}/deleteID/${reportId}`;
      return this.httpClient.delete<any>(url);
    })
  );
}

findReportBy(postId: number, userId: number): Observable<number> {
  const url = `${this.reportURL}/findReportBy/${postId}/${userId}`;
  return this.httpClient.get<number>(url);
}


isPostReportedByUser(postId: number, userId: number): Observable<boolean> {
  const url = `${this.reportURL}/${postId}/isReportedBy/${userId}`;
  return this.httpClient.get<boolean>(url);
}


getReportId(postId: number, userId: number): Observable<number> {
  const url = `${this.reportURL}/findReportId/${postId}/${userId}`;
  return this.httpClient.get<number>(url);
}

disapprovePost(postId: number): Observable<ForumPost> {
  const url = `${this.forumURL}/DispprovePost/${postId}`;
  return this.httpClient.put<ForumPost>(url, null);
}
deletePost(postId: number): Observable<any> {
  const url = `${this.forumURL}/deleteID/${postId}`;
  return this.httpClient.delete<any>(url).pipe(
    catchError(error => {
      console.error('Error deleting post:', error);
      return throwError(error);
    })
  );
}

deleteComment(commentId: number): Observable<void> {
  const url = `${this.commURL}/deleteID/${commentId}`;
  return this.httpClient.delete<void>(url);
}

getActiveMembersCount(): Observable<number> {
  const url = `${this.forumURL}/getActiveMembersCount`; 
  return this.httpClient.get<number>(url);
}
}