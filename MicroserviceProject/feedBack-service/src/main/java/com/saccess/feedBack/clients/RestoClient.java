package com.saccess.feedBack.clients;

import com.saccess.feedBack.dto.Restodto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(value = "RESTAURANTS-SERVICE")
public interface RestoClient {
    @GetMapping("/restaurants")
    public List<Restodto> getAllRestaurants();
}
