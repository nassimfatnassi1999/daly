package com.saccess.forumservice.controller;
import com.saccess.forumservice.Entities.CommentairePost;
import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.services.IGestionCommentairePost;
import com.saccess.forumservice.services.IGestionPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//@CrossOrigin("*")
@RestController

@RequestMapping("/api/Commentaire")
public class CommentairePostController {
    @Autowired
    IGestionCommentairePost gestionCommentaire;
    @Autowired
IGestionPost gestionPost;
    @DeleteMapping("/deleteID/{id}")
    public void delete(@PathVariable("id") long id){

        gestionCommentaire.removeCommentaire(id);
    }
    @GetMapping("/getall")
    public List<CommentairePost> getall() {
        return gestionCommentaire.retrieveAllCommentaires();}

    @GetMapping("/getId/{id}")
    public CommentairePost getId(@PathVariable("id") Long id) {
        return gestionCommentaire.retreiveCommentaire(id);}

    @PostMapping("/add")
    public CommentairePost add(@RequestBody CommentairePost commentairePost){
        return gestionCommentaire.addCommentaire(commentairePost);
    }


    @PostMapping("/addP/{numP}")

    public CommentairePost add(@RequestBody CommentairePost commentairePost, @PathVariable("numP") Long postId) {
        Post post = gestionPost.retreivePost(postId);
        if (post == null) {
            throw new RuntimeException("Post not found with id: " + postId);
        }
        return gestionCommentaire.addCommentaireAndAssignToPost(commentairePost,postId);
    }



    @PutMapping ("/update")
    public CommentairePost update(@RequestBody CommentairePost commentairePost){
        return gestionCommentaire.updateCommentaire(commentairePost);
    }

    @GetMapping("/getCommentsCount/{postId}")
    public int getCommentsCountForPost(@PathVariable Long postId) {
        return gestionCommentaire.getCommentsCountForPost(postId);
    }
    @GetMapping("/getPostComments/{postId}")
    public List<CommentairePost> getPostComments(@PathVariable Long postId) {
        return gestionCommentaire.getCommentsForPost(postId);}

/*    @PostMapping("/likeComm/{commId}/{userId}")
    public CommentairePost likeCommentaire(@PathVariable("commId") Long commId, @PathVariable("userId") Long userId) {
        return gestionCommentaire.likeCommentaire(commId,userId);
    }
    @PostMapping("/unlikeComm/{commId}/{userId}")
    public CommentairePost unLikeCommentaire(@PathVariable("commId") Long commId, @PathVariable("userId") Long userId) {
        return gestionCommentaire.unLikeCommentaire(commId,userId);
    }*/
}
