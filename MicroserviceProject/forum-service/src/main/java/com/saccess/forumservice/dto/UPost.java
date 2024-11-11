package com.saccess.forumservice.dto;

import com.saccess.forumservice.Entities.Topic;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public record UPost(
        Long idPost ,String titlePost,String contentPost ,LocalDateTime creationDatePost ,Long auteurId, boolean isApproved,String photoPost,Topic topic, Userdto user
) {
}
