package com.backend.railwaybookingsystem.dtos.users;

import com.backend.railwaybookingsystem.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class CreateUserRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Phone is required")
    @Size(min = 8, max = 11, message = "Phone must be between 3 and 30 characters")
    private String phone;

    @NotBlank(message = "Address is required")
    @Size(min = 8, max = 150, message = "Address must be between 3 and 30 characters")
    private String address;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 12, message = "Password must be between 6 and 12 characters")
    private String password;

    @NotNull(message = "Role is required")
    private UserRole userRole;
}
