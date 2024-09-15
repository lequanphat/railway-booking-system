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
@RequestMapping("admin")
public class AdminController {
    @GetMapping("/hello")
    @Operation(tags = "Hello Admin Service", description = "When you send token information in the header it just says Hello Admin")
    public ResponseEntity<String> sayHelloAdmin() {

        return ResponseEntity.ok("Hello Admin, Welcome to my app");
    }

}
