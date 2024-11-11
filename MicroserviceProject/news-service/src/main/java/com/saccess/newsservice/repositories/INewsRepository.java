package com.saccess.newsservice.repositories;

import com.saccess.newsservice.entities.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Date;
import java.util.List;


@Repository
public interface INewsRepository extends JpaRepository<News, Long> {

    public Iterable<News> findByDateBefore(Date twoWeeksAgo);
    @Query("select n from News n order by n.date desc ")
    public List<News> findAllOrder();
}
