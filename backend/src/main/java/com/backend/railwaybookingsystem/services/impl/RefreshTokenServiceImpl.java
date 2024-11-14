package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.exceptions.TokenRefreshException;
import com.backend.railwaybookingsystem.models.RefreshToken;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.repositories.RefreshTokenRepository;
import com.backend.railwaybookingsystem.repositories.UserRepository;
import com.backend.railwaybookingsystem.security.jwt.JwtProperties;
import com.backend.railwaybookingsystem.services.RefreshTokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProperties jwtProperties;

    @Override
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .expiryDate(Instant.now().plusSeconds(jwtProperties.getExpirationRefreshMinute() * 60))
                .token(UUID.randomUUID().toString())
                .build();
        log.info("Refresh token created for user: {}", refreshToken.toString());
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken validateRefreshToken(String token){
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByToken(token);

        if(refreshToken.isEmpty()){
            throw new TokenRefreshException("Token not found. Please issue a new request");
        }
        if(refreshToken.get().getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refreshToken.get());
            throw new TokenRefreshException("Expired token. Please issue a new request");
        }
        return createRefreshToken(refreshToken.get().getUser());

    }
}
