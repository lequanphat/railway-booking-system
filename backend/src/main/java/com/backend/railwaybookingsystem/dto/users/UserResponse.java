package com.backend.railwaybookingsystem.dto.users;

import com.backend.railwaybookingsystem.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    private String name;

    private String username;

    private String email;

    private UserRole userRole;
}
