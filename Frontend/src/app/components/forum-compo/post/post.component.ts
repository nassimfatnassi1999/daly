import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from 'src/app/models/ForumPost';
import { ForumServicesService } from 'src/app/services/forum/forum-services.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('commentTextArea') commentTextArea!: ElementRef;
  @ViewChild('postContent') postContent!: ElementRef;
  postId: number = 0;
  post: ForumPost | null = null;
  comments: any[] = [];
  isLoading: boolean = false;
  newCommentContent: string = '';
  isLiked: boolean = false;
  isLikedByCurrentUser: boolean = false;
  isDislikedByCurrentUser: boolean = false;
  userId: number = 4; // Default value, replace with actual logic to get the user's ID
  dislikeButtonClickCount: number = 0;
  reportReason: string = '';
  showReportAlert: boolean = false;
  isReported: boolean = false;
  reportId: number | undefined;
  isTextareaEmpty: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private forumService: ForumServicesService, private router: Router,
    private us : UserServicesService
  ) { }


  async ngOnInit() {
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.userId = user.id;
      }
    })
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.postId = +id;
        this.loadPostAndComments();
        this.checkIfPostLikedByCurrentUser();
        this.checkIfPostDislikedByCurrentUser();
        this.checkIfPostReportedByCurrentUser();        
      }
    });
  }

  loadPostAndComments(): void {
    this.isLoading = true;
    this.forumService.getPostById(this.postId).subscribe(
      post => {
        this.post = post;
        this.loadComments();
      },
      error => {
        console.error('Error retrieving post:', error);
        this.isLoading = false;
      }
    );
  }

  loadComments(): void {
    this.forumService.getCommentsForPost(this.postId).subscribe(
      comments => {
        this.comments = comments;
        console.log('Comments:', this.comments);
        this.isLoading = false;
      },
      error => {
        console.error('Error retrieving comments:', error);
        this.isLoading = false;
      }
    );
  }
  

  saveComment(): void {
    if (this.newCommentContent.trim() !== '') {
      const newCommentData = {
        auteurId: this.userId, // Use class property
        contentComm: this.newCommentContent,
        creationDateComm: new Date().toISOString()
      };

      console.log('Sending comment data:', newCommentData); // Debugging log

      this.forumService.saveComment(newCommentData, this.postId).subscribe(
        response => {
          console.log('New comment saved successfully:', response);
          this.loadComments();
          this.newCommentContent = '';
          this.isTextareaEmpty = true;

        },
        error => {
          console.error('Error saving comment:', error);
        }
      );
    }
  }
  clearCommentTextArea(): void {
    // Clear the text area content
    this.newCommentContent = '';
    this.isTextareaEmpty = true;
  }
  checkIfPostLikedByCurrentUser(): void {
    this.forumService.isPostLikedByUser(this.postId, this.userId).subscribe(
      isLiked => {
        this.isLikedByCurrentUser = isLiked; // Update the like status
      },
      error => {
        console.error('Error checking if the post is liked by the user:', error);
      }
    );
  }
  checkIfPostDislikedByCurrentUser(): void {
    this.forumService.isPostDislikedByUser(this.postId, this.userId).subscribe(
      isDisliked => {
        this.isDislikedByCurrentUser = isDisliked;
      },
      error => {
        console.error('Error checking if the post is disliked by the user:', error);
      }
    );
  }
  
  likePost(postId: number | undefined): void {
    if (!postId) {
      console.error('Post ID is undefined');
      return;
    }
  
    // Reset the dislike button click count to 0
    this.dislikeButtonClickCount = 0;
  
    if (!this.isLikedByCurrentUser) {
      // Like the post
      this.forumService.likePost(postId, this.userId).subscribe(
        response => {
          console.log('Post liked successfully', response);
          this.isLikedByCurrentUser = true; // Update the like status
          // Since the user liked the post, remove any existing dislike
          this.isDislikedByCurrentUser = false;
        },
        error => {
          console.error('Error liking the post:', error);
        }
      );
    } else {
      // Unlike the post
      this.forumService.unlikePost(postId, this.userId).subscribe(
        response => {
          console.log('Post unliked successfully', response);
          this.isLikedByCurrentUser = false; // Update the like status
        },
        error => {
          console.error('Error unliking the post:', error);
        }
      );
    }
  }
  
  dislikePost(postId: number | undefined): void {
    if (!postId) {
      console.error('Post ID is undefined');
      return;
    }
  
    if (!this.isDislikedByCurrentUser) {
      // Remove any existing likes
      if (this.isLikedByCurrentUser) {
        this.likePost(postId);
      }
  
      this.forumService.dislikePost(postId, this.userId).subscribe(
        response => {
          console.log('Post disliked successfully', response);
          this.isDislikedByCurrentUser = true;
          // Since the user disliked the post, remove any existing like
          this.isLikedByCurrentUser = false;
        },
        error => {
          console.error('Error disliking the post:', error);
        }
      );
    } else {
      // If already disliked, remove the dislike
      this.forumService.undislikePost(postId, this.userId).subscribe(
        response => {
          console.log('Post undisliked successfully', response);
          this.isDislikedByCurrentUser = false;
        },
        error => {
          console.error('Error undisliking the post:', error);
        }
      );
    }
  }
  
  ngAfterViewInit(): void {
    if (this.postContent) {
      this.postContent.nativeElement.scrollIntoView();
    }
  }  


  scrollToComments(): void {
    // Focus on the textarea
    if (this.commentTextArea) {
      this.commentTextArea.nativeElement.focus();
    }
  }


  toggleReportAlert(): void {
    if (!this.isReported) {
      // If the post is not already reported, toggle the report alert
      this.showReportAlert = !this.showReportAlert;
    } else {
      // If the post is already reported, delete the report directly
      this.deleteReport(this.postId, this.userId);
    }
  }
  
  
 /*  addReport(): void {
    this.forumService.addReport(this.postId, this.reportReason).subscribe(
      (reportId: number) => {
        console.log('Report saved successfully. Report ID:', reportId);
        this.reportId = reportId;
        this.toggleReportAlert();
        this.isReported = true;
        this.reportReason = '';
        
        // Check the number of reports for the post
        this.forumService.getReportsCountForPost(this.postId).subscribe(
          count => {
            if (count >= 5) {
              // If the count reaches 5 or more, disapprove the post
              this.forumService.disapprovePost(this.postId).subscribe(
                disapprovedPost => {
                  console.log('Post disapproved successfully:', disapprovedPost);
                },
                error => {
                  console.error('Error disapproving post:', error);
                }
              );
            }
          },
          error => {
            console.error('Error getting reports count for post:', error);
          }
        );
      },
      error => {
        console.error('Error saving report:', error);
      }
    );
  } */
  addReport(): void {
    if (this.reportReason.trim() !== '') {
      this.forumService.addReport(this.userId, this.postId, this.reportReason).subscribe(
        (reportId: number) => {
          console.log('Report saved successfully. Report ID:', reportId);
          this.reportId = reportId;
          this.toggleReportAlert();
          this.isReported = true;
          this.reportReason = '';
          
          // Check the number of reports for the post
          this.forumService.getReportsCountForPost(this.postId).subscribe(
            count => {
              if (count >= 5) {
                // If the count reaches 5 or more, disapprove the post
                this.forumService.disapprovePost(this.postId).subscribe(
                  disapprovedPost => {
                    console.log('Post disapproved successfully:', disapprovedPost);
                  },
                  error => {
                    console.error('Error disapproving post:', error);
                  }
                );
              }
            },
            error => {
              console.error('Error getting reports count for post:', error);
            }
          );
        },
        error => {
          console.error('Error saving report:', error);
        }
      );
    }
  }
  saveReport(): void {
    if (!this.isReported && this.reportReason.trim() !== '') {
      this.addReport();
      this.reportReason = '';
    }
  }
  
  deleteReport(postId: number | undefined, userId: number | undefined): void {
    if (postId !== undefined && userId !== undefined) {
      this.forumService.deleteReport(postId, userId).subscribe(
        response => {
          console.log('Delete report response:', response);
          console.log('Report deleted successfully');
          this.isReported = false;
          this.reportId = undefined;
          this.reportReason = '';
        },
        error => {
          console.error('Error deleting report:', error);
        }
      );
    } else {
      console.error('Post ID or User ID is undefined. Cannot delete report.');
    }
  }
  
  cancelReport(): void {
    this.toggleReportAlert();
    this.reportReason = '';
  }

  checkIfPostReportedByCurrentUser(): void {
    // Check if the post is reported by the current user
    this.forumService.findReportBy(this.postId, this.userId).subscribe(
      (reportId: number) => {
        this.isReported = reportId !== null; // Update isReported based on the existence of a report
      },
      error => {
        console.error('Error checking if the post is reported by the user:', error);
      }
    );
  }
  isPostOwner(): boolean {
    // Check if the current user is the owner of the post
    return this.post !== null && this.post.auteurId !== null && this.post.auteurId === this.userId;
  }
  deletePost(): void {
    if (confirm('Are you sure you want to delete this Post?')) {
    this.forumService.deletePost(this.postId).subscribe(
      () => {
        console.log('Post deleted successfully');
        this.router.navigateByUrl('/forum');
        // Redirect or handle success
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }
  }

deleteComment(commentId: number) {
  if (confirm('Are you sure you want to delete this comment?')) {
    this.forumService.deleteComment(commentId).subscribe(
      () => {
        // Refresh comments after successful deletion
        this.loadComments();
      },
      error => {
        console.error('Error deleting comment:', error);
        // Handle error if needed
      }
    );
  }
}
checkTextarea() {
  this.isTextareaEmpty = this.commentTextArea.nativeElement.value.trim() === '';
}


}