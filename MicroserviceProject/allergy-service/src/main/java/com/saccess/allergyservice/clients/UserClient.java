package com.saccess.allergyservice.clients;

import com.saccess.allergyservice.dto.Userdto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(value = "USER-SERVICE")
public interface UserClient {
    @GetMapping("/user/getbyid/{id}")
    public Userdto getUserById(@PathVariable("id")Long id);
    @GetMapping("/user/getAllUsers")
    public List<Userdto> getAllUsers();
}
