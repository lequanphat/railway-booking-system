package com.backend.railwaybookingsystem.service;

import com.backend.railwaybookingsystem.model.RefreshToken;
import com.backend.railwaybookingsystem.model.User;

import java.util.Optional;

public interface RefreshTokenService {
    Optional<RefreshToken> findByToken(String token);
    RefreshToken createRefreshToken(User user);
    RefreshToken verifyExpiration(RefreshToken token);
}
