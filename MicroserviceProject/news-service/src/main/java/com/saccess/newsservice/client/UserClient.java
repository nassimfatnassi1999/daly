package com.saccess.newsservice.client;

import com.saccess.newsservice.dto.UserDto;
import lombok.Getter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(value = "USER-SERVICE")
public interface UserClient {


    @GetMapping("/user/getbyid/{id}")
    public UserDto getUserById(@PathVariable("id")Long id);
    @GetMapping("/user/getAllUsers")
    public List<UserDto> getAllUsers();


}
