package com.backend.railwaybookingsystem.dtos.auth.response;

import com.backend.railwaybookingsystem.enums.UserRole;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
	private AuthenticatedUserDto user;
	private String token;
	private String refreshToken;
	private long expiresIn;

	@Getter
	@Setter
	@NoArgsConstructor
	public static class AuthenticatedUserDto {

		private Long id;

		private String name;

		private String email;

		private String avatar;

		private UserRole userRole;

	}
}


