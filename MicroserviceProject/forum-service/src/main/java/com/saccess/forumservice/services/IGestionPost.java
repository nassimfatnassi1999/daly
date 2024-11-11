package com.saccess.forumservice.services;

import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.Entities.Topic;
import com.saccess.forumservice.dto.FullResponse;
import com.saccess.forumservice.dto.UPost;
import com.saccess.forumservice.dto.Userdto;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface IGestionPost {
    Post retreivePost(Long idPost);
    //    Post retreiveApprovedPost(Long idPost);
    List<Post> retrieveAllPosts();
    public List<UPost> retrieveAllPostsWithUser();
    public List<Post> getAllApprovedPostsOrderByDateCreationDesc();
    Post addPost(Post post);
    Post updatePost(Post post);
    void removePost(Long idPost);
    Post AddPostAndAssignToUser(Post post, Long userId);
    Post ApprovePost(Long idPost);
    Post DisapprovePost(Long idPost);
    List<Post> getPostsByTopic(Topic topic);

    Post likePost(Long postId, Long userId) ;
    Post unlikePost(Long postId, Long userId);
    Post undeslikePost(Long postId, Long userId);
    Post dislikePost(Long postId, Long userId) ;

    int getLikesCountForPost( Long postId);
    int getDislikesCountForPost( Long postId);
    //Optional<byte[]> getPhotoData(String photoId);
            //  Post reportPost(Long idPost, Long userId);

//    Post addPostView(Long postId, Long userId);
List<Post> getLatestPosts();
boolean isPostLikedByUser(Long postId, Long userId);

    boolean isPostDeslikedByUser(Long postId, Long userId);
    Long getActiveMembersPost();
 FullResponse getUserAndPost(Long id);
 Userdto findUserById(Long userid);

}
