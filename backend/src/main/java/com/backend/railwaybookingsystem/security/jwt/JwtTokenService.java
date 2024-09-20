package com.backend.railwaybookingsystem.security.jwt;

import com.backend.railwaybookingsystem.mappers.UserMapper;
import com.backend.railwaybookingsystem.model.RefreshToken;
import com.backend.railwaybookingsystem.model.User;
import com.backend.railwaybookingsystem.dto.auth.AuthenticatedUserDto;
import com.backend.railwaybookingsystem.dto.auth.request.LoginRequest;
import com.backend.railwaybookingsystem.dto.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.service.RefreshTokenService;
import com.backend.railwaybookingsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenService {

	@Autowired
	private final UserService userService;

	@Autowired
	private final RefreshTokenService refreshTokenService;

	@Autowired
	private JwtProperties jwtProperties;

	private final JwtTokenManager jwtTokenManager;

	private final AuthenticationManager authenticationManager;

	public LoginResponse getLoginResponse(LoginRequest loginRequest) {

		final String username = loginRequest.getUsername();
		final String password = loginRequest.getPassword();

		final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, password);

		authenticationManager.authenticate(usernamePasswordAuthenticationToken);

		final User user = userService.findAuthenticatedUserByUsername(username);
		final String token = jwtTokenManager.generateToken(user);
		final RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

		log.info("{} has successfully logged in!", user.getUsername());

		return LoginResponse.builder()
				.token(token)
				.refreshToken(refreshToken.getToken())
				.expiresIn(jwtProperties.getExpirationMinute() * 60)
				.build();
	}

	public String generateTokenFromRefreshToken(RefreshToken refreshToken) {
		final User user = refreshToken.getUser();
		final String token = jwtTokenManager.generateToken(user);
		log.info("{} has successfully refreshed the token!", user.getUsername());
		return token;
	}
}
