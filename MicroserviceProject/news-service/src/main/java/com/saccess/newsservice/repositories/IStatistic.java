package com.saccess.newsservice.repositories;

import com.saccess.newsservice.entities.StatisticUserBadWord;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IStatistic extends JpaRepository<StatisticUserBadWord,Long> {

    @Query("select s from StatisticUserBadWord s where s.user_id = :user_id")
    public StatisticUserBadWord getByIdUser(@Param("user_id") Long user_id);

}
