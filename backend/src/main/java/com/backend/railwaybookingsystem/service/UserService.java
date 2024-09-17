package com.backend.railwaybookingsystem.service;

import com.backend.railwaybookingsystem.dto.auth.AuthenticatedUserDto;
import com.backend.railwaybookingsystem.dto.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dto.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dto.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UserResponse;
import com.backend.railwaybookingsystem.model.User;

import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse saveUser(CreateUserRequest request);
    UserResponse updateUser(Long id, UpdateUserRequest updateRequest);
    UserResponse deleteUser(Long id);

    User findByUsername(String username);
    RegistrationResponse registration(RegistrationRequest registrationRequest);
    AuthenticatedUserDto findAuthenticatedUserByUsername(String username);
}
