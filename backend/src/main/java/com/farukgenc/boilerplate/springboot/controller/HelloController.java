package com.farukgenc.boilerplate.springboot.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
@RestController
@RequestMapping("api")
public class HelloController {

	@GetMapping("/hello-world")
	@Operation(tags = "Hello World", description = "Test CORS")
	public ResponseEntity<String> hellWorld() {
		return ResponseEntity.ok("Hello World, You have connected with me successfully!");
	}
	@GetMapping("/hello")
	@Operation(tags = "Hello User Service", description = "When you send token information in the header it just says Hello User")
	public ResponseEntity<String> sayHello() {

		return ResponseEntity.ok("Hello User, Welcome to my app");
	}
}
