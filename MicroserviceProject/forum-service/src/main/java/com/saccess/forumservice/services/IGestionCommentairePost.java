package com.saccess.forumservice.services;

import com.saccess.forumservice.Entities.CommentairePost;

import java.util.List;

public interface IGestionCommentairePost {
    CommentairePost retreiveCommentaire(Long idComm);
    List<CommentairePost> retrieveAllCommentaires();
    CommentairePost addCommentaire(CommentairePost commentairePost);
    CommentairePost updateCommentaire(CommentairePost commentairePost);
    void removeCommentaire(Long idComm);
    int getCommentsCountForPost(Long postId) ;
    List<CommentairePost> getCommentsForPost(Long postId);
    CommentairePost addCommentaireAndAssignToPost(CommentairePost commentairePost , Long userId);
      Long getActiveMembersComm();

/*    CommentairePost likeCommentaire(Long idComm, Long userId);
    CommentairePost unLikeCommentaire(Long idComm, Long userId);*/
}