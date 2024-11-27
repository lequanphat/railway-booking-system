package com.backend.railwaybookingsystem.services;


import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;

public interface OAuthService {
    LoginResponse authenticateGoogle(String credential);

    LoginResponse authenticateFacebook(String accessToken);
}
