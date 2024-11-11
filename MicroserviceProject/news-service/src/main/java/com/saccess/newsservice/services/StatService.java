package com.saccess.newsservice.services;

import com.saccess.newsservice.entities.StatisticUserBadWord;
import com.saccess.newsservice.repositories.IStatistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatService {
    @Autowired
    IStatistic statRepo;


    public StatisticUserBadWord add(StatisticUserBadWord sts){
        return  statRepo.save(sts);
    }
    public StatisticUserBadWord update(StatisticUserBadWord sts){
        return statRepo.save(sts);
    }
    public StatisticUserBadWord getByIDUser(Long user_id){
        return statRepo.getByIdUser(user_id);
    }
}
