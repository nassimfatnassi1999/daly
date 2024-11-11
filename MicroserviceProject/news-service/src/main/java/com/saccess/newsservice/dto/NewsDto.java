package com.saccess.newsservice.dto;

import com.saccess.newsservice.entities.Image;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record NewsDto(
        Long id,
        String title,
        String comment,
        Image image,
        Date date,
        UserDto user

) {
}
