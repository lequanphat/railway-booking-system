package com.backend.railwaybookingsystem.dtos.users;

import com.backend.railwaybookingsystem.enums.UserGender;
import com.backend.railwaybookingsystem.enums.UserRole;
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

    private String email;

    private UserGender gender;

    private String phone;

    private String address;

    private UserRole userRole;
}
