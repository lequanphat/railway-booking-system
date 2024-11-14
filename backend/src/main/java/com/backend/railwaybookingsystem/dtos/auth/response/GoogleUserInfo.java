package com.backend.railwaybookingsystem.dtos.auth.response;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleUserInfo {
	private String name;
	private String email;
	private String picture;
}


