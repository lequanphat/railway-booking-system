package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.auth.response.RefreshTokenResponse;
import com.backend.railwaybookingsystem.models.RefreshToken;
import com.backend.railwaybookingsystem.models.User;


public interface RefreshTokenService {
    RefreshToken createRefreshToken(User user);
    RefreshToken validateRefreshToken(String token);
}
