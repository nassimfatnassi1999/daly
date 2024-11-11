package com.saccess.newsservice.services;

import java.io.IOException;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.cloudinary.utils.ObjectUtils;
import com.saccess.newsservice.client.UserClient;
import com.saccess.newsservice.dto.NewsDto;
import com.saccess.newsservice.dto.UserDto;
import com.saccess.newsservice.entities.Image;
import com.saccess.newsservice.entities.News;
import com.saccess.newsservice.entities.StatisticUserBadWord;
import com.saccess.newsservice.repositories.INewsRepository;
import com.saccess.newsservice.repositories.IStatistic;
import com.saccess.newsservice.repositories.ImageRepository;
import jakarta.transaction.Transactional;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class GestionNewsImpl implements IGestionNews {

	@Autowired
	private  INewsRepository newRepo;
	@Autowired
	private CloudinaryService cloudinaryService;
	@Autowired
	private ImageRepository imgRepo;
	@Autowired
	private UserClient userClient;
	@Autowired
	private BadWordsService badWordsService;
	@Autowired
	IStatistic statRepo;
	@Autowired
	StatService statService;

	@Override
	public News getNews(Long id) {
		// TODO Auto-generated method stub
		return newRepo.findById(id).get();
	}

	@Override
	public List<News> getAllNews() {
		// TODO Auto-generated method stub
		return newRepo.findAll();
	}

	@Override
	public News updateNews(Long id,String title,String desc) {
		News N = newRepo.findById(id).get();
		N.setTitle(title);
		N.setComment(desc);
		return newRepo.save(N);
	}

	public void deleteImageFromCloudinary(String imageUrl) {
		try {
			// 5oudh imageID from URL
			String imageId = extractImageIdFromUrl(imageUrl);
			// Supprimer image from Cloudinary
			cloudinaryService.cloudinary.uploader().destroy(imageId, ObjectUtils.emptyMap());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public  String extractImageIdFromUrl(String imageUrl) {
        // positionner id mel URl
		int lastSlashIndex = imageUrl.lastIndexOf("/");
		int lastDotIndex = imageUrl.lastIndexOf(".");
		// extract imageID from URL /blablabla
		return imageUrl.substring(lastSlashIndex + 1, lastDotIndex);
	}

	@Override
	public void deleteNews(Long id) {
		Optional<News> newsOptional = newRepo.findById(id);
		if (newsOptional.isPresent()) {
			News news = newsOptional.get();
			String imageURL = news.getImage().getImageURL();
			Long imageId = news.getImage().getId();
			deleteImageFromCloudinary(imageURL);
			newRepo.deleteById(id);
		}
	}
	//************************************************************************
	@Transactional
	public ResponseEntity<String> addNewsWithImage(News news, MultipartFile imageFile) {
		try {
			//if (!checkBadWords(news.getComment(), news.getTitle())) {
				// Enregistrer l'image sur Cloudinary
				Map uploadResult = cloudinaryService.upload(imageFile);
				// Récupérer l'URL de l'image depuis Cloudinary
				String imageUrl = (String) uploadResult.get("url");
				Image image = new Image();
				image.setName(imageFile.getOriginalFilename());
				image.setImageURL(imageUrl);
				imgRepo.save(image);
				news.setImage(image);
				LocalDate currentDate = LocalDate.now();
				Date date = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
				news.setDate(date);
				newRepo.save(news);
				return new ResponseEntity<>("News added successfully", HttpStatus.OK);
			//} else {
				/*StatisticUserBadWord sts = statService.getByIDUser(news.getUser_id());
				if (sts == null) {
					sts = new StatisticUserBadWord();
					sts.setUser_id(news.getUser_id());
					sts.setNbr_badWord(1);
					statService.add(sts);
				} else {
					sts.setNbr_badWord(sts.getNbr_badWord() + 1);
					statService.update(sts);
				}*/

			} catch (IOException ex) {
			ex.printStackTrace();
			return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);

		}
   /* } catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);

		}*/
	}


	public List<UserDto> getallUsersFromYoussef(){
		return userClient.getAllUsers();
	}

	public  List<News> getAllNewsOrderByDate(){
		return  newRepo.findAllOrder();
	}

	@Override
	public List<NewsDto> getAllNewsWithUsers(){
		List<News> allNews = newRepo.findAll();

		return allNews.stream()
				.map(news -> {
					UserDto user = userClient.getUserById(news.getUser_id());
					return convertToDto(news, user);
				})
				.collect(Collectors.toList());
	}

	@Override
	public Boolean checkBadWords(String comment, String title) {
		return badWordsService.verif(comment,title);
	}

	@Override
	public List<StatisticUserBadWord> getAllStat() {
		return statRepo.findAll();
	}

	@Override
	public StatisticUserBadWord getStatByUser(Long user_id) {
		return statRepo.getByIdUser(user_id);
	}

	private NewsDto convertToDto(News news, UserDto user) {
		return new NewsDto(
				news.getId(),
				news.getTitle(),
				news.getComment(),
				news.getImage(),
				news.getDate(),
				user
		);
	}

}
