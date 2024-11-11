package com.saccess.feedBack.dto;

import com.saccess.feedBack.entities.Status;
import com.saccess.feedBack.entities.Type;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record UFeedback(
                        Long FeedbackID,
                        String title,
                        String description,
                        Date CreatedAt,
                        Date UpdatedAt,
                        Status status,
                        Type type,
                        long id_restaurant,
                        Userdto user
) {

}
