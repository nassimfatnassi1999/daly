package com.saccess.newsservice.repositories;

import com.saccess.newsservice.entities.Image;
import com.saccess.newsservice.entities.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
