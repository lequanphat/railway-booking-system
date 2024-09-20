package com.backend.railwaybookingsystem.dto.auth.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
	private String token;
	private String refreshToken;
	private long expiresIn;
}
