package com.saccess.feedBack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class FeedBackServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedBackServiceApplication.class, args);
	}

}
