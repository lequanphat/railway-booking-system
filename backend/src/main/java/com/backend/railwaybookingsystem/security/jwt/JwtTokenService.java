package com.backend.railwaybookingsystem.security.jwt;

import com.backend.railwaybookingsystem.dtos.auth.response.RefreshTokenResponse;
import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.mappers.UserMapper;
import com.backend.railwaybookingsystem.models.RefreshToken;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.dtos.auth.request.LoginRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.repositories.UserRepository;
import com.backend.railwaybookingsystem.services.RefreshTokenService;
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
	private final UserRepository userRepository;

	@Autowired
	private final RefreshTokenService refreshTokenService;

	@Autowired
	private JwtProperties jwtProperties;

	private final JwtTokenManager jwtTokenManager;

	private final AuthenticationManager authenticationManager;

	public LoginResponse getLoginResponse(LoginRequest loginRequest) {

		final String email = loginRequest.getEmail();
		final String password = loginRequest.getPassword();



		Optional<User> user = userRepository.findUserByEmailAndProvider(email, AuthProvider.EMAIL);
		if (user.isEmpty()) {
			throw new BadRequestException("Email does not exist");
		}

		final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user.get().getId(), password);
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
				.user(UserMapper.INSTANCE.convertToAuthenticatedUserDto(user.get()))
				.token(token)
				.refreshToken(refreshToken.getToken())
				.expiresIn(jwtProperties.getExpirationMinute() * 60)
				.build();
	}

	public String generateAccessToken(User user) {
		return jwtTokenManager.generateToken(user);
	}

	public RefreshTokenResponse executeRefreshToken(String token){
		RefreshToken refreshToken = refreshTokenService.validateRefreshToken(token);
		String accessToken = generateAccessToken(refreshToken.getUser());
		return new RefreshTokenResponse(accessToken, refreshToken.getToken());
	}
}
