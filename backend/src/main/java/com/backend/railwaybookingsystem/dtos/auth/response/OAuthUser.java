package com.backend.railwaybookingsystem.dtos.auth.response;
import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.enums.UserRole;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OAuthUser {
	private String name;
	private String email;
	private String avatar;
	private UserRole userRole = UserRole.USER;
	private AuthProvider provider;
}


