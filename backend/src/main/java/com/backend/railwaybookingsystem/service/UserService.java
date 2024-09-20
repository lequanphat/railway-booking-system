package com.backend.railwaybookingsystem.service;

import com.backend.railwaybookingsystem.dto.auth.AuthenticatedUserDto;
import com.backend.railwaybookingsystem.dto.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dto.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dto.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UserResponse;
import com.backend.railwaybookingsystem.model.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    Page<UserResponse> getUsers(int page, int size, String keyword);
    UserResponse saveUser(CreateUserRequest request);
    UserResponse updateUser(Long id, UpdateUserRequest updateRequest);
    UserResponse deleteUser(Long id);

    User findByUsername(String username);
    RegistrationResponse registration(RegistrationRequest registrationRequest);
    User findAuthenticatedUserByUsername(String username);
}
