package com.saccess.newsservice.controllers;

import com.saccess.newsservice.dto.NewsDto;
import com.saccess.newsservice.dto.UserDto;
import com.saccess.newsservice.entities.News;
import com.saccess.newsservice.entities.StatisticUserBadWord;
import com.saccess.newsservice.services.IGestionNews;
import com.saccess.newsservice.services.ScheduledService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
//@CrossOrigin("*")
@RequestMapping("/news")
@AllArgsConstructor
public class NewsController {
    IGestionNews news_service;

    ScheduledService scheduledService;



    @GetMapping("/getAll")
    public List<News> getAllNews(){

        //return news_service.getAllNews();
        return news_service.getAllNewsOrderByDate();
    }

    @GetMapping("/get/{id}")
    public News getNewsById(@PathVariable("id") Long id){
        return news_service.getNews(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNews(@PathVariable("id") Long id){
        news_service.deleteNews(id);
    }
    @PatchMapping("/edit/{id}/{t}/{c}")
    public News updateNews(@PathVariable("id") Long id,
                           @PathVariable("t") String t,
                           @PathVariable("c") String c){

        return news_service.updateNews(id,t,c);
    }
//***********************************************************************
@PostMapping("/addNews")
public ResponseEntity<String> addNewsWithImage(@RequestParam("title") String title,
                                               @RequestParam("comment") String comment,
                                               @RequestParam("user_id") Long userId,
                                               @RequestParam("image") MultipartFile imageFile) {
    try {
        News news = new News();
        news.setTitle(title);
        news.setComment(comment);
        news.setUser_id(userId);

        news_service.addNewsWithImage(news, imageFile);

        return ResponseEntity.status(HttpStatus.CREATED).body("News ajoutée avec succès !");
    } catch (Exception e) {
        e.printStackTrace(); // ou tout autre traitement d'erreur approprié
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'ajout de la news.");
    }
}
//************************************************************************************
       @GetMapping("/getOldNews")
    public Iterable<News> getOldNews(){
        return scheduledService.getOldNews();
       }
//***************************************************************************************

     @GetMapping("/getAllUsers")
    public List<UserDto> getallUsersFromYoussef(){
        return news_service.getallUsersFromYoussef();
     }
//*******************************************************************
    @GetMapping("/getAllNewsWithUsers")
    public List<NewsDto> getAllNewsWithUsers(){
        return news_service.getAllNewsWithUsers();
    }
    //*****************************************
    @PostMapping("/checkBadWord")
    public Boolean checkBadWord(@RequestBody News news){
        return news_service.checkBadWords(news.getComment(),news.getTitle());   }

    //**************************************
    @GetMapping("/getAllStat")
    public List<StatisticUserBadWord> getAllStat(){
        return news_service.getAllStat();
    }
    @GetMapping("/getStatByUser/{id}")
    public StatisticUserBadWord getStatByUser(@PathVariable("id") Long user_id){
        return news_service.getStatByUser(user_id);
    }



}
