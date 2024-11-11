package com.saccess.newsservice.services;

import com.saccess.newsservice.entities.News;
import com.saccess.newsservice.repositories.INewsRepository;
import com.saccess.newsservice.repositories.ImageRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@AllArgsConstructor
@Slf4j
public class ScheduledService {

    private INewsRepository newRepo;
    private CloudinaryService cloudinaryService;
    private ImageRepository imgRepo;
    private IGestionNews newsService;

    /*@Scheduled(cron =" 10 * * * * *")
    public void deletedAutomatically(){
        // Supprimer les news qui ont plus de 2 semaines
        Date twoWeeksAgo = new Date(System.currentTimeMillis() - (14 * 24 * 60 * 60 * 1000));
        Iterable<News> oldNews = newRepo.findByDateBefore(twoWeeksAgo);
        for (News news : oldNews) {
            Long newsId = news.getId();
            //log.info("news number : "+newsId);
            newsService.deleteNews(newsId);
        }
    }*/

    public Iterable<News> getOldNews(){
        Date twoWeeksAgo = new Date(System.currentTimeMillis() - (14 * 24 * 60 * 60 * 1000));
        return newRepo.findByDateBefore(twoWeeksAgo);
    }


}
