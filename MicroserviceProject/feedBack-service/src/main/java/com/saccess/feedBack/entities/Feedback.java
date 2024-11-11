package com.saccess.feedBack.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long FeedbackID;
    private String title;
    private String description;
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    private Date CreatedAt;
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    private Date UpdatedAt;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private Type type;
    private  Long user_id;
    private long id_restaurant;


}
