package com.saccess.forumservice.services;

import com.saccess.forumservice.Entities.CommentairePost;
import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.Repository.ICommentairePostRepository;
import com.saccess.forumservice.Repository.IPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GestionCommentairePostImpl implements IGestionCommentairePost {
    @Autowired
    ICommentairePostRepository commentaireRep;
    @Autowired
    IPostRepository postRepos;

    @Override
    public CommentairePost retreiveCommentaire(Long idComm) {
        return commentaireRep.findById(idComm).get();
    }

    @Override
    public List<CommentairePost> retrieveAllCommentaires() {
        return commentaireRep.findAll();
    }

    @Override
    public CommentairePost addCommentaire(CommentairePost commentairePost) {
        return commentaireRep.save(commentairePost);
    }

    @Override
    public CommentairePost updateCommentaire(CommentairePost commentairePost) {
        return commentaireRep.save(commentairePost);
    }

    @Override
    public void removeCommentaire(Long idComm) {
        commentaireRep.deleteById(idComm);
    }

    @Override
    public int getCommentsCountForPost(Long postId) {
        return commentaireRep.countByPostId(postId);
    }
    @Override
    public CommentairePost addCommentaireAndAssignToPost(CommentairePost commentairePost , Long userId) {
        Post post= postRepos.findById(userId).get();
        commentairePost.setPostC(post);
        return commentaireRep.save(commentairePost);
    }

    @Override
    public List<CommentairePost> getCommentsForPost(Long postId) {

        return commentaireRep.findByPostCIdPost(postId);
    }


    @Override
    public Long getActiveMembersComm() {
        return commentaireRep.countActiveCommenters();
    }

   /* @Override
    public CommentairePost likeCommentaire(Long idComm, Long userId) {
        CommentairePost com = commentaireRep.findById(idComm).orElseThrow(() -> new RuntimeException("Post not found with id " + idComm));;
        if (!com.getCommLikedBy().contains(userId)) {
            com.getCommLikedBy().add(userId);
        }
        return commentaireRep.save(com);
    }



    @Override
    public CommentairePost unLikeCommentaire(Long idComm, Long userId) {
        CommentairePost com = commentaireRep.findById(idComm).orElseThrow(() -> new RuntimeException("Post not found with id " + idComm));;

        if (!com.getCommLikedBy().contains(userId)) {
            com.getCommLikedBy().add(userId);
        }
        return commentaireRep.save(com);}
*/


}

