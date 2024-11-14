package com.backend.railwaybookingsystem.controllers;
import com.backend.railwaybookingsystem.dtos.auth.request.GoogleLoginRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.services.OAuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/oauth2")
@Slf4j
public class OAuth2Controller {

    @Autowired
    private OAuthService oauthService;

    @PostMapping("/google")
    public ResponseEntity<LoginResponse> googleLogin(@Valid @RequestBody GoogleLoginRequest request) {
        return ResponseEntity.ok(oauthService.authenticate(request.getCredential()));
    }

}
