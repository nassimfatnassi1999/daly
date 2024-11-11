package com.saccess.forumservice.Repository;

import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.Entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post,Long> {
    List<Post> findByIsApprovedTrueOrderByCreationDatePostDesc();

    List<Post> findByTopic(Topic topic);
    List<Post> findByAuteurId(Long authorId);
    List<Post> findTop3ByIsApprovedTrueOrderByCreationDatePostDesc();
    @Query("select count(distinct(p.auteurId)) from Post p")
    Long countActiveUsers();

}