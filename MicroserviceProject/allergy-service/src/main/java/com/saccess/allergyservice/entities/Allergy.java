package com.saccess.allergyservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Allergy implements Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
        private Long id_Allergy;
      private String name;
      @Enumerated(EnumType.STRING)
      private Level level;
      private  String dietry_restrictionsary;
      private LocalDate date;
      private Long id_user;
}
