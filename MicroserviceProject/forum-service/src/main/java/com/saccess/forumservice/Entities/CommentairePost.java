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
public class CommentairePost implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idComm ;
    private String contentComm ;
    private Long auteurId;
    private LocalDateTime creationDateComm ;
    private String photoComm;
    @ElementCollection
    private List<Long> commLikedBy = new ArrayList<>();
    @ElementCollection
    private List<Long> commDislikedBy = new ArrayList<>();
    @ManyToOne
            @JsonIgnore
    Post postC;
}

