package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;
import com.backend.railwaybookingsystem.mappers.UserMapper;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.repositories.UserRepository;
import com.backend.railwaybookingsystem.security.jwt.JwtProperties;
import com.backend.railwaybookingsystem.security.jwt.JwtTokenService;
import com.backend.railwaybookingsystem.services.OAuthService;
import com.backend.railwaybookingsystem.services.RefreshTokenService;
import com.backend.railwaybookingsystem.strategies.auth.enums.OAuthType;
import com.backend.railwaybookingsystem.strategies.auth.impl.FacebookAuthStrategy;
import com.backend.railwaybookingsystem.strategies.auth.impl.GoogleAuthStrategy;
import com.backend.railwaybookingsystem.strategies.auth.OAuthContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class OAuthServiceImpl implements OAuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private OAuthContext oAuthContext;

    @Override
    public LoginResponse authenticateGoogle(String credential) {
        log.info("Google login credential: {}", credential);
        OAuthUser oauthUser = oAuthContext.authenticate(credential, OAuthType.GOOGLE);
        return authenticateOAuthUser(oauthUser);
    }

    @Override
    public LoginResponse authenticateFacebook(String accessToken) {
        log.info("Facebook login credential: {}", accessToken);
        OAuthUser oauthUser = oAuthContext.authenticate(accessToken, OAuthType.FACEBOOK);
        return authenticateOAuthUser(oauthUser);
    }

    private LoginResponse authenticateOAuthUser(OAuthUser oauthUser) {
        Optional<User> optionalUser = userRepository.findUserByEmailAndProvider(oauthUser.getEmail(), oauthUser.getProvider());
        User user = optionalUser.orElseGet(() -> userRepository.save(UserMapper.INSTANCE.convertToUser(oauthUser)));

        return LoginResponse.builder()
                .user(UserMapper.INSTANCE.convertToAuthenticatedUserDto(user))
                .token(jwtTokenService.generateAccessToken(user))
                .refreshToken(refreshTokenService.createRefreshToken(user).getToken())
                .expiresIn(jwtProperties.getExpirationMinute() * 60)
                .build();
    }
}
