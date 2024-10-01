package com.backend.railwaybookingsystem.dtos.auth.response;

import com.backend.railwaybookingsystem.models.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
	private User user;
	private String token;
}
