package com.backend.railwaybookingsystem.dtos.auth.response;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshTokenResponse {
	private String token;
	private String refreshToken;
}


