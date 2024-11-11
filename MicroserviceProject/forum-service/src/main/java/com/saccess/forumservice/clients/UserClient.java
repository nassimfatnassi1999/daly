package com.saccess.forumservice.clients;
import com.saccess.forumservice.dto.Userdto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "USER-SERVICE")
public interface UserClient {
    @GetMapping("/user/getbyid/{id}")
    public Userdto getUserById(@PathVariable("id")Long id);

}