package com.backend.railwaybookingsystem.dtos.auth.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@NoArgsConstructor
public class RegistrationRequest {

	@NotEmpty(message = "Name is required")
	private String name;

	@Email(message = "Email not valid")
	@NotEmpty(message = "Email is required")
	private String email;

	@NotEmpty(message = "Password is required")
	private String password;

}
