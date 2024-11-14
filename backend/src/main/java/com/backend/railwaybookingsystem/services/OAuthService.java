package com.backend.railwaybookingsystem.services;


import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;

public interface OAuthService {
    LoginResponse authenticate(String credential);
}
