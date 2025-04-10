package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.auth.request.LoginRequest;
import com.backend.railwaybookingsystem.dtos.auth.request.RefreshTokenRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.AuthenticationResponse;
import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.RefreshTokenResponse;
import com.backend.railwaybookingsystem.dtos.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.exceptions.AuthenticationException;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.security.jwt.JwtTokenService;
import com.backend.railwaybookingsystem.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<RefreshTokenResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String token = request.getRefreshToken();

        return ResponseEntity.ok(jwtTokenService.executeRefreshToken(token));
    }

    @GetMapping("/me")
    @Operation(tags = "Authentication", description = "You can get your own information by sending your token.")
    public ResponseEntity<AuthenticationResponse> me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            throw new AuthenticationException("Authenticated is required");
        }
        Long userId = Long.parseLong(authentication.getName());
        return ResponseEntity.ok(userService.findMe(userId));
    }

    @GetMapping("/verify-account/{token}")
    @Operation(tags = "Verify account", description = "Verify account by token.")
    public ResponseEntity<User> verifyAccount(@PathVariable String token) {
        User user = userService.verifyAccount(token);
        return ResponseEntity.ok(user);
    }
}
