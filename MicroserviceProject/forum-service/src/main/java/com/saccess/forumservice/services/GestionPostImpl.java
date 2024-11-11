package com.saccess.forumservice.services;

import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.Entities.Topic;
import com.saccess.forumservice.Repository.IPostRepository;
import com.saccess.forumservice.clients.UserClient;
import com.saccess.forumservice.dto.FullResponse;
import com.saccess.forumservice.dto.UPost;
import com.saccess.forumservice.dto.Userdto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class GestionPostImpl implements IGestionPost {
    @Autowired
    IPostRepository postRep;
    @Autowired
    UserClient userClient;


    @Override
    public Post addPost(Post post) {
        return postRep.save(post);
    }

    @Override
    public Post retreivePost(Long idPost) {
        return postRep.findById(idPost).get();
    }

    @Override
    public List<Post> retrieveAllPosts() {
        return postRep.findByIsApprovedTrueOrderByCreationDatePostDesc();
    }

    @Override
    public List<UPost> retrieveAllPostsWithUser() {
        List<Post> posts =  postRep.findByIsApprovedTrueOrderByCreationDatePostDesc();
        List<UPost> posts1 = posts.stream().map(post -> {
            return new UPost(post.getIdPost(),post.getTitlePost(),post.getContentPost(),post.getCreationDatePost(),post.getAuteurId(),post.isApproved(),post.getPhotoPost(),post.getTopic(),userClient.getUserById(post.getAuteurId()));
        }).toList();
        return posts1;
    }

    @Override
    public Post updatePost(Post post) {
        return postRep.save(post);
    }

    @Override
    public void removePost(Long idPost) {
        postRep.deleteById(idPost);
    }

    @Override
    public Post ApprovePost(Long idPost) {
        if (!postRep.existsById(idPost)) {
            throw new RuntimeException("Post with ID " + idPost + " does not exist.");
        }
        Post post=postRep.findById(idPost).get();
        post.setApproved(true);
        return postRep.save(post);
    }

    @Override
    public Post DisapprovePost(Long idPost) {
        if (!postRep.existsById(idPost)) {
            throw new RuntimeException("Post with ID " + idPost + " does not exist.");
        }
        Post post=postRep.findById(idPost).get();
        post.setApproved(false);
        return postRep.save(post);
    }

    @Override
    public List<Post> getAllApprovedPostsOrderByDateCreationDesc() {
        return postRep.findByIsApprovedTrueOrderByCreationDatePostDesc();
    }

    @Override
    public Post AddPostAndAssignToUser(Post post, Long userId) {
        post.setAuteurId(userId);
        post.setCreationDatePost(LocalDateTime.now());
        return postRep.save(post);
    }


    @Override
    public List<Post> getPostsByTopic(Topic topic) {
        return postRep.findByTopic(topic);
    }

   /* @Override
    public Post reportPost(Long idPost, Long userId) {
        Post post = retreivePost(idPost);

        if (!post.getReportedBy().contains(userId)) {
            post.setReport(post.getReport() + 1);
            post.getReportedBy().add(userId);

            if (post.getReport() >= 5) {
                postRep.deleteById(idPost);
                return null;
            }
            else {
                postRep.save(post);
            }

        }

        return post;
    }
*/



/*    @Override
    public Post addPostView(Long postId, Long userId) {
        Optional<Post> optionalPost = postRep.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            if (!post.getPostView().contains(userId)) {
                post.getPostView().add(userId);
                return postRep.save(post);
            }
        }
        return null;
    }*/


@Override
    public Post likePost(Long postId, Long userId) {
        Post post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + postId));

        if (post.getPostDislikedBy().contains(userId)) {
            post.getPostDislikedBy().remove(userId);
        }
        if (!post.getPostLikedBy().contains(userId)) {
            post.getPostLikedBy().add(userId);
        }

        return postRep.save(post);
    }


    @Override
    public Post unlikePost(Long postId, Long userId) {
            Post post = postRep.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post not found with id " + postId));

            if (post.getPostLikedBy().contains(userId)) {
                post.getPostLikedBy().remove(userId);
            }

            return postRep.save(post);}

    @Override
    public Post undeslikePost(Long postId, Long userId) {
        Post post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + postId));

        if (post.getPostDislikedBy().contains(userId)) {
            post.getPostDislikedBy().remove(userId);
        }

        return postRep.save(post);
    }

    public Post dislikePost(Long postId, Long userId) {
        Post post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + postId));

        if (post.getPostLikedBy().contains(userId)) {
            post.getPostLikedBy().remove(userId);
        }
        if (!post.getPostDislikedBy().contains(userId)) {
            post.getPostDislikedBy().add(userId);
        }

        return postRep.save(post);
    }

    @Override
    public int getLikesCountForPost(Long postId) {
        Post post = postRep.findById(postId).orElse(null);
            return post.getPostLikedBy().size();
    }

    @Override
    public int getDislikesCountForPost(Long postId) {
        Post post = postRep.findById(postId).orElse(null);
        return post.getPostDislikedBy().size();
    }

    @Override
    public boolean isPostLikedByUser(Long postId, Long userId) {
        Optional<Post> optionalPost = postRep.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            return post.getPostLikedBy().contains(userId);
        }
        return false;
    }

    @Override
    public boolean isPostDeslikedByUser(Long postId, Long userId) {
        Optional<Post> optionalPost = postRep.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            return post.getPostDislikedBy().contains(userId);
        }
        return false;
    }
   /* @Value("${upload.path}")
    private String uploadPath;

    // Rest of your service methods...

    @Override
    public Optional<byte[]> getPhotoData(String photoId) {
        try {
            // Construct the file path based on the photoId
            Path imagePath = Paths.get(uploadPath, photoId);

            // Read the image data from the file
            byte[] imageData = Files.readAllBytes(imagePath);

            return Optional.of(imageData);
        } catch (IOException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }*/
@Override
    public List<Post> getLatestPosts() {
        return postRep.findTop3ByIsApprovedTrueOrderByCreationDatePostDesc();
    }

    @Override
    public Long getActiveMembersPost() {
        return postRep.countActiveUsers();
    }

    @Override
    public FullResponse getUserAndPost(Long id) {
        Userdto user = userClient.getUserById(id); //user jebneh
        List<Post> posts = postRep.findByAuteurId(id);

        return new FullResponse(user,posts);
    }
    @Override
    public Userdto findUserById(Long userid) {
        return userClient.getUserById(userid);
    }

}
