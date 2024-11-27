package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.auth.request.FacebookLoginRequest;
import com.backend.railwaybookingsystem.dtos.auth.request.GoogleLoginRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.services.OAuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
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
        return ResponseEntity.ok(oauthService.authenticateGoogle(request.getCredential()));
    }

    @PostMapping("/facebook")
    public ResponseEntity<LoginResponse> facebookLogin(@Valid @RequestBody FacebookLoginRequest request) {
        log.info("Facebook login request received" + request.getAccessToken());
        return ResponseEntity.ok(oauthService.authenticateFacebook(request.getAccessToken()));
    }
}
