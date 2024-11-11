package com.saccess.newsservice.services;

import com.saccess.newsservice.entities.BadWord;
import com.saccess.newsservice.repositories.IBadWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BadWordsService {
    @Autowired
    IBadWordRepository badWordRepository;
    public boolean verif(String comment,String title) {
        if (containsBadWord(comment) || containsBadWord(title)) {

                return true;
        }
        else
            return false;
    }

    public boolean containsBadWord(String content) {
        List<BadWord> badWords = badWordRepository.findAll();

        for (BadWord badWord : badWords) {
            if (content.toLowerCase().contains(badWord.getWord().toLowerCase())){
                return true;
            }
        }
        return false;
    }
}
