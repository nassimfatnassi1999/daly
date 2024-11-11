package com.saccess.allergyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AllergyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AllergyServiceApplication.class, args);
	}

}
