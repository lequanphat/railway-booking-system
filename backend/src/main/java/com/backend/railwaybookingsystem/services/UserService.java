package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.models.User;
import org.springframework.data.domain.Page;

public interface UserService {
    Page<UserResponse> getUsers(int page, int size, String keyword);
    UserResponse saveUser(CreateUserRequest request);
    UserResponse updateUser(Long id, UpdateUserRequest updateRequest);
    UserResponse deleteUser(Long id);

    RegistrationResponse registration(RegistrationRequest registrationRequest);
    User findAuthenticatedUserByEmail(String email);

}
