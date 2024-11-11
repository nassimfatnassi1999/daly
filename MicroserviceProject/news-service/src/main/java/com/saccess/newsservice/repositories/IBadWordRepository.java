package com.saccess.newsservice.repositories;

import com.saccess.newsservice.entities.BadWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBadWordRepository extends JpaRepository<BadWord,Long> {
}
