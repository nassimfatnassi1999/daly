package com.saccess.allergyservice.services;

import com.saccess.allergyservice.clients.RestaurantClient;
import com.saccess.allergyservice.clients.UserClient;
import com.saccess.allergyservice.dto.DishDto;
import com.saccess.allergyservice.dto.FullAllergyUser;
import com.saccess.allergyservice.dto.FullResponse;
import com.saccess.allergyservice.dto.Userdto;
import com.saccess.allergyservice.entities.Allergy;
import com.saccess.allergyservice.entities.Level;
import com.saccess.allergyservice.repositories.IAllergyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class GestionAllergyImp implements IGestionAllergy{
    @Autowired
    IAllergyRepository allergyRepository;
    @Autowired
    UserClient userClient;
    @Autowired
    RestaurantClient restaurantClient;

    @Override
    public List<Allergy> retrieveAllAllergy() {
        return allergyRepository.findAll();
    }

    @Override
    public Allergy addAllergy(Allergy allergy) {
        return allergyRepository.save(allergy);
    }

    @Override
    public Allergy updateAllergy(Allergy allergy) {
        return allergyRepository.save(allergy);
    }

    @Override
    public Allergy retrieveAllergy(Long id_Allergy) {
        return allergyRepository.findById(id_Allergy).orElse(null);
    }

    @Override
    public void removeAllergy(Long id_Allergy) {
        allergyRepository.deleteById(id_Allergy);

    }

    @Override
    public Allergy getAllergyByname(String name) {
        return allergyRepository.getAllergyByName(name);
    }

    @Override
    public FullAllergyUser getAllergyLevel(Level level) {
        List<Allergy>  allergies =allergyRepository.getAllergyByLevel(level);
        List<Userdto> userdtos = userClient.getAllUsers();
        return new FullAllergyUser(userdtos,allergies);
    }

    @Override
    public Userdto findUserById(Long userid) {
        return userClient.getUserById(userid);
    }

    @Override
    public int getTotalAllergiesByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Allergy> allergies = allergyRepository.getTotalAllergiesByDateRange(startDate, endDate);
        return allergies.size()+1;
    }

    @Override
    public FullResponse getUserAndAllergy(Long id) {
       Userdto user = userClient.getUserById(id); //user jebneh
        List<Allergy> allergies = allergyRepository.getAllAleergybyUserId(id);

        return new FullResponse(user,allergies);
    }

    @Override
    public List<Userdto> getAllUsers() {
        return userClient.getAllUsers();
    }

    @Override
    public FullAllergyUser getAllUserAllergy() {
        List<Userdto> userdtos=userClient.getAllUsers();
        List<Allergy> allergies=allergyRepository.findAll();

        return  new FullAllergyUser(userdtos,allergies);
    }
    @Override
    public void deleteAllegiesByUserId(long user_id){
        allergyRepository.deleteAll(allergyRepository.getAllAleergybyUserId(user_id));
    }
    @Override
    public List<DishDto> getRecomendation(Long userId){
        Userdto user = userClient.getUserById(userId);
        List<Allergy> allergies = allergyRepository.getAllAleergybyUserId(userId);
        List<String> preferences = Arrays.stream(user.preferences().split(",")).toList();
        System.out.println("<---------------------------------------------->");
        System.out.println("User Preferences :");
        preferences.forEach(System.out::println);
        List<DishDto> dishes = restaurantClient.getAllDishes().getBody();
        System.out.println("All dishes:");
        dishes.forEach(System.out::println);
        dishes.sort(Comparator.comparingDouble(DishDto::Rating).reversed());
        List<DishDto> filtredDishes = new ArrayList<>(dishes.stream().filter(item -> preferences.stream().anyMatch(pref -> pref.contains(item.category()))).toList());
        System.out.println("Filtred dishes:");
        filtredDishes.forEach(pref -> System.out.println(pref));
        if(filtredDishes.size() < 3){
            System.out.println("low size");
            filtredDishes.addAll(dishes);
        }
        List<DishDto> finalList = filtredDishes.stream().filter(item -> Arrays.stream(item.description().split(" ")).noneMatch(ing -> allergies.stream().anyMatch(allergy -> allergy.getDietry_restrictionsary().equals(ing)))).toList();
        System.out.println("Final list dishes:");
        finalList.forEach(pref -> System.out.println(pref));
        return finalList;
    }

}
