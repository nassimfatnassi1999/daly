package com.saccess.forumservice.controller;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.Entities.Topic;
import com.saccess.forumservice.Repository.IPostRepository;
import com.saccess.forumservice.dto.FullResponse;
import com.saccess.forumservice.dto.UPost;
import com.saccess.forumservice.services.IGestionCommentairePost;
import com.saccess.forumservice.services.IGestionPost;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;
//@CrossOrigin("*")
@RestController
@RequestMapping("/api/Post")
public class PostController {

    @Autowired
    IGestionPost gestionPost;
    @Autowired
    IGestionCommentairePost commGest;

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/add")
    public Post add(@RequestBody Post post){
        return gestionPost.addPost(post);
    }
    @PostMapping("/upload-photo")
    public ResponseEntity<Map<String, String>> uploadPhoto(@RequestParam("photo") MultipartFile photo) {
        if (photo.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        try {
            // Generate a unique file name for the uploaded photo
            String fileName = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();

            // Save the photo to the server
            File file = new File(uploadPath + File.separator + fileName);
            photo.transferTo(file);

            // Construct the URL of the uploaded photo
            String photoUrl = "http://localhost:9030/" + fileName;
            // Create a map to hold the response data
            Map<String, String> response = new HashMap<>();
            response.put("photoUrl", photoUrl);

            // Return the map as JSON response
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getall")
    public List<UPost> getall() {
        return gestionPost.retrieveAllPostsWithUser();
    }

    @GetMapping("/getallApproved")
    public List<Post> getAllApprovedPostsOrdered() {
        return gestionPost.getAllApprovedPostsOrderByDateCreationDesc();
    }

    @GetMapping("/getId/{id}")
    public Post getId(@PathVariable("id") Long id) {
        return gestionPost.retreivePost(id);
    }

    @DeleteMapping("/deleteID/{id}")
    public void delete(@PathVariable("id") long id){
        gestionPost.removePost(id);
    }

    @PutMapping ("/update")
    public Post update(@RequestBody Post post){
        return gestionPost.updatePost(post);
    }

    @PostMapping("/AddPostAndAssignToUser/{numU}")
    public Post AddPostAndAssignToTopicAndUser(@RequestBody Post post,
                                               @PathVariable("numU") Long userId) {
        return gestionPost.AddPostAndAssignToUser(post, userId);
    }

    @PutMapping ("/ApprovePost/{numP}")
    public Post ApprovePost( @PathVariable("numP") Long idPost) {
        return gestionPost.ApprovePost(idPost);
    }
    @PutMapping ("/DispprovePost/{numP}")
    public Post DisapprovePost( @PathVariable("numP") Long idPost) {
        return gestionPost.DisapprovePost(idPost);
    }

    @GetMapping("/getByTopic/{topic}")
    public List<Post> getByTopic(@PathVariable("topic") Topic topic) {
        return gestionPost.getPostsByTopic(topic);
    }

    @PostMapping("/like/{postId}/{userId}")
    public Post likePost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        return gestionPost.likePost(postId, userId);
    }
    @PostMapping("/unlike/{postId}/{userId}")
    public Post unlikePost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        return gestionPost.unlikePost(postId, userId);
    }

    @PostMapping("/dislike/{postId}/{userId}")
    public Post dislikePost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        return gestionPost.dislikePost(postId, userId);
    }


    @PostMapping("/unDeslike/{postId}/{userId}")
    public Post unDeslikePost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        return gestionPost.undeslikePost(postId, userId);
    }
    @GetMapping("/getLikesCount/{postId}")
    public int getLikesCountForPost(@PathVariable Long postId) {
        return gestionPost.getLikesCountForPost(postId);
    }

    @GetMapping("/getDislikesCount/{postId}")
    public int getDislikesCountForPost(@PathVariable Long postId) {
        return gestionPost.getDislikesCountForPost(postId);
    }

    @GetMapping("/{postId}/isLikedBy/{userId}")
    public ResponseEntity<?> isPostLikedByUser(@PathVariable Long postId, @PathVariable Long userId) {
        boolean isLiked = gestionPost.isPostLikedByUser(postId, userId);
        return ResponseEntity.ok(isLiked);
    }

    @GetMapping("/{postId}/isDeslikedBy/{userId}")
    public ResponseEntity<?> isPostDeslikedByUser(@PathVariable Long postId, @PathVariable Long userId) {
        boolean isDesliked = gestionPost.isPostDeslikedByUser(postId, userId);
        return ResponseEntity.ok(isDesliked);
    }




    @GetMapping("/getLatestPosts")
    public List<Post> getLatestPosts() {
        return gestionPost.getLatestPosts();
    }

    @GetMapping("/getActiveMembersCount")
    public Long getActiveMembersCount() {
        return gestionPost.getActiveMembersPost()+commGest.getActiveMembersComm();
    }
    @GetMapping("/getFullResponse/{id}")
    public FullResponse getAllPostUser(@PathVariable("id") Long id){
        return gestionPost.getUserAndPost(id);
    }
}
