package com.nhatsinh.railwaybookingsystem.service;

import com.nhatsinh.railwaybookingsystem.dto.auth.AuthenticatedUserDto;
import com.nhatsinh.railwaybookingsystem.dto.auth.request.RegistrationRequest;
import com.nhatsinh.railwaybookingsystem.dto.auth.response.RegistrationResponse;
import com.nhatsinh.railwaybookingsystem.dto.users.CreateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UserResponse;
import com.nhatsinh.railwaybookingsystem.model.User;

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
