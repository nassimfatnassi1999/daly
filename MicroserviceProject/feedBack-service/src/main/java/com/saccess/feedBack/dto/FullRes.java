package com.saccess.feedBack.dto;

import com.saccess.feedBack.entities.Feedback;

import java.util.List;

public record FullRes(
 List<Feedback> feedbacks,
 Userdto user
) {
}
