package com.backend.railwaybookingsystem.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    @GetMapping("/hello")
    @Operation(tags = "Hello Admin Service", description = "When you send token information in the header it just says Hello Admin")
    public ResponseEntity<String> sayHelloAdmin() {

        return ResponseEntity.ok("Hello Admin, Welcome to my app");
    }

}
