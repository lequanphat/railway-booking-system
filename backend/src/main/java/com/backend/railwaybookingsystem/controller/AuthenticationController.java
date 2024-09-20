package com.backend.railwaybookingsystem.controller;

import com.backend.railwaybookingsystem.dto.auth.request.LoginRequest;
import com.backend.railwaybookingsystem.dto.auth.request.RefreshTokenRequest;
import com.backend.railwaybookingsystem.dto.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.dto.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dto.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.model.User;
import com.backend.railwaybookingsystem.security.jwt.JwtTokenService;
import com.backend.railwaybookingsystem.service.RefreshTokenService;
import com.backend.railwaybookingsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@Slf4j
public class AuthenticationController {
    @Autowired
    private JwtTokenService jwtTokenService;
    @Autowired
    private UserService userService;
    @Autowired
    private RefreshTokenService refreshTokenService;

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

    @PostMapping("/refresh")
    @Operation(tags = "Authentication", description = "You can refresh your token by sending your refresh token.")
    public ResponseEntity<String> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String token = request.getRefreshToken();

        return refreshTokenService.findByToken(token)
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> jwtTokenService.generateTokenFromRefreshToken(refreshToken))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("Invalid refresh token"));
    }

    @GetMapping("/me")
    @Operation(tags = "Authentication", description = "You can get your own information by sending your token.")
    public ResponseEntity<User> me() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username == null) {
            throw new RuntimeException("User not found");
        }
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }
}
