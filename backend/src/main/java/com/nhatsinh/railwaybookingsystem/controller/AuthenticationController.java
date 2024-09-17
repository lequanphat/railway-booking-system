package com.nhatsinh.railwaybookingsystem.controller;

import com.nhatsinh.railwaybookingsystem.dto.auth.request.LoginRequest;
import com.nhatsinh.railwaybookingsystem.dto.auth.response.LoginResponse;
import com.nhatsinh.railwaybookingsystem.dto.auth.request.RegistrationRequest;
import com.nhatsinh.railwaybookingsystem.dto.auth.response.RegistrationResponse;
import com.nhatsinh.railwaybookingsystem.security.jwt.JwtTokenService;
import com.nhatsinh.railwaybookingsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
    @Autowired
    private JwtTokenService jwtTokenService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    @Operation(tags = "Authentication", description = "You must log in with the correct information to successfully obtain the token information.")
    public ResponseEntity<LoginResponse> loginRequest(@Valid @RequestBody LoginRequest loginRequest) {

        final LoginResponse loginResponse = jwtTokenService.getLoginResponse(loginRequest);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    @Operation(tags = "Authentication", description = "You can register to the system by sending information in the appropriate format.")
    public ResponseEntity<RegistrationResponse> registrationRequest(@Valid @RequestBody RegistrationRequest registrationRequest) {

        final RegistrationResponse registrationResponse = userService.registration(registrationRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(registrationResponse);
    }
}
