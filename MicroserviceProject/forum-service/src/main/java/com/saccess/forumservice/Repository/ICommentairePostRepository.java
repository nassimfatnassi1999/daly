package com.saccess.forumservice.Repository;

import com.saccess.forumservice.Entities.CommentairePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICommentairePostRepository extends JpaRepository<CommentairePost, Long> {

    List<CommentairePost> findByPostCIdPost(Long postId);

    @Query("SELECT COUNT(c) FROM CommentairePost c WHERE c.postC.idPost = ?1")
    int countByPostId(Long postId);
    @Query("select count(distinct(c.auteurId)) from CommentairePost c")
    Long countActiveCommenters();
}