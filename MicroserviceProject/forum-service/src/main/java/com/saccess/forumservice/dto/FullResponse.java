package com.saccess.forumservice.dto;

import com.saccess.forumservice.Entities.Post;

import java.util.List;

public record FullResponse(Userdto user,
                           List<Post> postList) {
}
