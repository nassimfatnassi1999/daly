import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumPost } from 'src/app/models/ForumPost';
import { ForumServicesService } from 'src/app/services/forum/forum-services.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  postTitle = '';
  postContent = '';
  selectedTopic = '';
  selectedPhoto: File | null = null;
  userId!: number;

  constructor(private forumService: ForumServicesService,    private router: Router, private us : UserServicesService) {}

  async ngOnInit() {
    await this.us.getCurrentUser().then((user) => {
      if(user){
        this.userId = user.id;
      }
    })
  }

  selectTopic(topic: string) {
    // handle the selected topic here
    console.log("Selected topic:", topic);
  }

  onPhotoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedPhoto = event.target.files[0]; // Save the selected photo file
    }
  }

  uploadPhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('photo', photoFile);

    return this.forumService.uploadPhoto(formData);
  }

  handlePhotoUrl(photoUrl: string) {
    // Do whatever you need to do with the photo URL, such as displaying it on the UI
    console.log('Photo URL:', photoUrl);
    // You can also assign it to a variable or display it on the UI
  }

  addPost(post: ForumPost) {
    return this.forumService.addPost(post);
  }

  onSubmit() {
    // Log the form data before adding the post
    console.log('Form Data:', {
      postTitle: this.postTitle,
      postContent: this.postContent,
      selectedTopic: this.selectedTopic,
      selectedPhoto: this.selectedPhoto
    });

    if (this.selectedPhoto) {
      // If a photo is selected, upload it and then add the post
      this.uploadPhoto(this.selectedPhoto).subscribe(
        (response: any) => {
          console.log('Photo uploaded successfully:', response);
          // Handle the photo URL received from the backend
          this.handlePhotoUrl(response.photoUrl);
          // Create a new post with the photo URL
          const newPost: ForumPost = {
            auteurId: this.userId,
            creationDatePost: new Date(),
            titlePost: this.postTitle,
            contentPost: this.postContent,
            topic: this.selectedTopic,
            photoPost: response.photoUrl
          };
          // Add the post
          this.addPost(newPost).subscribe(
            (result) => {
              console.log('Post added successfully:', result);
              // Reset the form fields after adding the post
              this.postTitle = '';
              this.postContent = '';
              this.selectedTopic = '';
              this.selectedPhoto = null;
              this.router.navigate(['/forum']);
            },
            (error) => {
              console.error('Error adding post:', error);
              // Handle error adding the post
            }
          );
        },
        (error) => {
          console.error('Error uploading photo:', error);
          // Handle error uploading the photo
        }
      );
    } else {
      // If no photo is selected, add the post without a photo
      const newPost: ForumPost = {
        auteurId: this.userId,
        creationDatePost: new Date(),
        titlePost: this.postTitle,
        contentPost: this.postContent,
        topic: this.selectedTopic,
        photoPost: null // No photo URL
      };
      // Add the post
      this.addPost(newPost).subscribe(
        (result) => {
          console.log('Post added successfully:', result);
          // Reset the form fields after adding the post
          this.postTitle = '';
          this.postContent = '';
          this.selectedTopic = '';
          this.selectedPhoto = null;
          this.router.navigate(['/forum']); // Navigate to the forum page

        },
        (error) => {
          console.error('Error adding post:', error);
          // Handle error adding the post
        }
      );
    }
  }
}
