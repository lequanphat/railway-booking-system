package com.backend.railwaybookingsystem.dtos.users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class UpdateUserRequest {

    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters")
    private String name;

    @NotBlank(message = "Phone is required")
    @Size(min = 8, max = 11, message = "Phone must be between 3 and 30 characters")
    private String phone;

    @NotBlank(message = "Address is required")
    @Size(min = 8, max = 150, message = "Address must be between 3 and 30 characters")
    private String address;

    private Boolean is_deleted;

}
