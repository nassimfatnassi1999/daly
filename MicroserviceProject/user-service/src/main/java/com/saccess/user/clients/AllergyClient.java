package com.saccess.user.clients;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(value = "ALLERGY-SERVICE")
public interface AllergyClient {
    @DeleteMapping("/apiachref/Allergy/deletebyuserid/{id}")
    public void deleteallergybyuserid(@PathVariable("id") Long id_user);
}
