package com.backend.railwaybookingsystem.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.security.utils.SecurityConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenManager {

	private final JwtProperties jwtProperties;

	public String generateToken(User user) {

		final Long userId = user.getId();
		final UserRole role = user.getUserRole();

		//@formatter:off
		return JWT.create()
				.withSubject(userId.toString())
				.withIssuer(jwtProperties.getIssuer())
				.withClaim("role", role.name())
				.withClaim("email", user.getEmail())
				.withClaim("userId", userId)
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + jwtProperties.getExpirationMinute() * SecurityConstants.EXPIRATION_TIME))
				.sign(Algorithm.HMAC256(jwtProperties.getSecretKey().getBytes()));
		//@formatter:on
	}

	public Long getUserIdFromToken(String token) {

		final DecodedJWT decodedJWT = getDecodedJWT(token);

		return decodedJWT.getClaim("userId").asLong();
	}

	public boolean validateToken(String token, Long userId) {

		final Long userIdFromToken = getUserIdFromToken(token);

		final boolean equalsUsername = userIdFromToken.equals(userId);
		final boolean tokenExpired = isTokenExpired(token);

		return equalsUsername && !tokenExpired;
	}

	private boolean isTokenExpired(String token) {

		final Date expirationDateFromToken = getExpirationDateFromToken(token);
		return expirationDateFromToken.before(new Date());
	}

	private Date getExpirationDateFromToken(String token) {

		final DecodedJWT decodedJWT = getDecodedJWT(token);

		return decodedJWT.getExpiresAt();
	}

	private DecodedJWT getDecodedJWT(String token) {

		final JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(jwtProperties.getSecretKey().getBytes())).build();

		return jwtVerifier.verify(token);
	}

}
