package com.backend.railwaybookingsystem.dtos.auth.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class GoogleLoginRequest {

	@NotEmpty(message = "Credential is required")
	private String credential;

}
