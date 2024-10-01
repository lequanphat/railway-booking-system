package com.backend.railwaybookingsystem.security.jwt;

import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.models.RefreshToken;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.dtos.auth.request.LoginRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.services.RefreshTokenService;
import com.backend.railwaybookingsystem.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

		final String email = loginRequest.getEmail();
		final String password = loginRequest.getPassword();

		final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(email, password);

		Optional<User> user = userService.findUserByEmail(email);
		if (user.isEmpty()) {
			throw new BadRequestException("Email does not exist");
		}
		try {
			authenticationManager.authenticate(usernamePasswordAuthenticationToken);
		}catch (Exception e){
			throw new BadRequestException("Invalid password");
		}

		if(!user.get().getIs_verified()){
			throw new BadRequestException("This account haven't been verified!");
		}

		final String token = jwtTokenManager.generateToken(user.get());
		final RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.get());

		return LoginResponse.builder()
				.user(user.get())
				.token(token)
				.refreshToken(refreshToken.getToken())
				.expiresIn(jwtProperties.getExpirationMinute() * 60)
				.build();
	}

	public String generateTokenFromRefreshToken(RefreshToken refreshToken) {
		final User user = refreshToken.getUser();
		final String token = jwtTokenManager.generateToken(user);
		log.info("{} has successfully refreshed the token!", user.getEmail());
		return token;
	}

	public String generateAccessToken(User user) {
		return jwtTokenManager.generateToken(user);
	}
}
