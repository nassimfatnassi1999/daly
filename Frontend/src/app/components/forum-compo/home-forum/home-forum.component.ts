import { Component, OnInit } from '@angular/core';
import { ForumPost } from 'src/app/models/ForumPost';
import { ForumServicesService } from 'src/app/services/forum/forum-services.service';

@Component({
  selector: 'app-home-forum',
  templateUrl: './home-forum.component.html',
  styleUrls: ['./home-forum.component.css']
})
export class HomeForumComponent implements OnInit {
  PostsTab: ForumPost[] = [];
  topics: string[] = [];
  latestPosts: ForumPost[] = []; // Add this property
  lastPostAuthorId: number= 0;
  activeMembersCount: number = 0;
  constructor(private forumPostService: ForumServicesService) { }

  ngOnInit() {
    this.getPosts();
    this.getLatestPosts(); // Fetch latest posts
    this.getActiveMembersCount();
  }

  getPosts() {
    this.forumPostService.getForum().subscribe((response) => {
      console.log('Posts:', response);  
      this.PostsTab = response || [];
      this.PostsTab.forEach(post => {
        if (post.idPost !== undefined) { // Check if idPost is defined
          this.forumPostService.getCommentsCountForPost(post.idPost).subscribe(count => {
            post.commentsCount = count;
          });
          this.forumPostService.getReportsCountForPost(post.idPost).subscribe(count => {
            post.reportsCount = count;
          });
          this.forumPostService.getLikesCountForPost(post.idPost).subscribe(count => {
            post.likesCount = count;
          });
          this.forumPostService.getDislikesCountForPost(post.idPost).subscribe(count => {
            post.dislikesCount = count;
          });
        }
      });
      this.topics = Array.from(new Set(this.PostsTab.map(post => post.topic)));
      console.log('Topics:', this.topics);  
    });
  }

  getLatestPosts() {
    this.forumPostService.getLatestPosts().subscribe((response) => {
      console.log('Latest Posts:', response);
      this.latestPosts = response || [];
      if (this.latestPosts.length > 0) {
        // Get the author ID of the last post
        this.lastPostAuthorId = this.latestPosts[this.latestPosts.length - 1].auteurId;
      }
    });
  }

  getTopicTitle(topic: string): string {
    switch(topic) {
      case 'AVIS_RESTAURANTS':
        return 'Avis sur les restaurants';
      case 'BONS_PLANS_ETUDIANTS':
        return 'Bons plans étudiants';
      case 'EVENEMENTS_RENCONTRES':
        return 'Événements et rencontres';
      case 'CUISINE_RECETTES':
        return 'Cuisine et recettes';
      default:
        return topic;
    }
  }

  calculateDuration(creationDate: Date): string {
    const now = new Date();
    const diff = Math.abs(now.getTime() - new Date(creationDate).getTime());
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else {
      return minutes <= 1 ? 'just now' : `${minutes} minutes ago`;
    }
  }


  getActiveMembersCount() {
    this.forumPostService.getActiveMembersCount().subscribe((count) => {
      console.log('Active Members Count:', count);
      this.activeMembersCount = count;
    });
  }
 
}
