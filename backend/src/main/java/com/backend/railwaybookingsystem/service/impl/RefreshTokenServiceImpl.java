package com.backend.railwaybookingsystem.service.impl;

import com.backend.railwaybookingsystem.exceptions.TokenRefreshException;
import com.backend.railwaybookingsystem.model.RefreshToken;
import com.backend.railwaybookingsystem.model.User;
import com.backend.railwaybookingsystem.repository.RefreshTokenRepository;
import com.backend.railwaybookingsystem.repository.UserRepository;
import com.backend.railwaybookingsystem.security.jwt.JwtProperties;
import com.backend.railwaybookingsystem.service.RefreshTokenService;
import com.backend.railwaybookingsystem.utils.ErrorCode;
import jakarta.transaction.Transactional;
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
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

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
    public RefreshToken verifyExpiration(RefreshToken token) {
        if(token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(ErrorCode.TOKEN_EXPIRED);
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }
}
