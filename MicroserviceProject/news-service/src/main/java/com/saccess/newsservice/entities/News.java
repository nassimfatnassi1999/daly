package com.saccess.newsservice.entities;

import java.io.Serializable;
import java.util.Date;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class News implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String comment;
	@OneToOne(cascade = CascadeType.ALL)
	private Image image;
	@DateTimeFormat(pattern = "YYYY-MM-DD")
	private Date date;
	private Long user_id;
}
