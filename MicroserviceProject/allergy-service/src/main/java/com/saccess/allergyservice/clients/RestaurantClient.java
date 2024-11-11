package com.saccess.allergyservice.clients;

import com.saccess.allergyservice.dto.DishDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(value = "RESTAURANT-SERVICE")
public interface RestaurantClient {
    @GetMapping("/restaurant/dishes")
    public ResponseEntity<List<DishDto>> getAllDishes();
}
