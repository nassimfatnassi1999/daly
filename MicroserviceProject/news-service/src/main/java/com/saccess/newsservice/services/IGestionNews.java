package com.saccess.newsservice.services;

import java.util.List;


import com.saccess.newsservice.dto.NewsDto;
import com.saccess.newsservice.dto.UserDto;
import com.saccess.newsservice.entities.News;
import com.saccess.newsservice.entities.StatisticUserBadWord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface IGestionNews {

	public News getNews(Long id);
	public List<News> getAllNews();
	public News updateNews(Long id,String title,String desc);
	public void deleteNews(Long id);
	public ResponseEntity<String> addNewsWithImage(News news, MultipartFile imageFile);
	public void deleteImageFromCloudinary(String imageUrl);
	public String extractImageIdFromUrl(String imageUrl);
	public List<UserDto> getallUsersFromYoussef();
	public List<News> getAllNewsOrderByDate();

	public List<NewsDto> getAllNewsWithUsers();

	public Boolean checkBadWords(String comment,String title);

	public List<StatisticUserBadWord> getAllStat();

	public StatisticUserBadWord getStatByUser(Long user_id);
}
