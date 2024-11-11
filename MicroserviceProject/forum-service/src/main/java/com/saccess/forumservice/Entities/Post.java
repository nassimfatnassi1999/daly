package com.saccess.forumservice.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Post implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPost ;
    private String titlePost;
    private String contentPost ;
    private LocalDateTime creationDatePost ;
    private Long auteurId;
    private boolean isApproved = true;
    private String photoPost;
    @Enumerated(EnumType.STRING)
    private Topic topic;
    @ElementCollection
    private List<Long> postLikedBy = new ArrayList<>();
    @ElementCollection
    private List<Long> postDislikedBy = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    private List<Report> reports= new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "postC")
    @JsonIgnore
    private List<CommentairePost> commentairePosts = new ArrayList<>();

}

