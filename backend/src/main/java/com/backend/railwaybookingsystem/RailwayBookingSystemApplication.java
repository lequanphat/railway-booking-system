package com.backend.railwaybookingsystem;

import com.backend.railwaybookingsystem.exceptions.ApiExceptionHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@EnableAspectJAutoProxy
@Import(ApiExceptionHandler.class)
public class RailwayBookingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(RailwayBookingSystemApplication.class, args);
	}

}
