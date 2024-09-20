package com.backend.railwaybookingsystem.service.impl;

import com.backend.railwaybookingsystem.dto.auth.AuthenticatedUserDto;
import com.backend.railwaybookingsystem.dto.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dto.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dto.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UserResponse;
import com.backend.railwaybookingsystem.exceptions.DuplicatedException;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.UserMapper;
import com.backend.railwaybookingsystem.model.User;
import com.backend.railwaybookingsystem.model.UserRole;
import com.backend.railwaybookingsystem.repository.UserRepository;
import com.backend.railwaybookingsystem.service.UserService;
import com.backend.railwaybookingsystem.utils.ErrorCode;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserResponse saveUser(CreateUserRequest request) {
        User existingUser = userRepository.findByUsername(request.getUsername());
        if (existingUser != null) {
            throw new DuplicatedException(ErrorCode.USER_ALREADY_EXISTS, request.getUsername());
        }
        User user = UserMapper.INSTANCE.convertToUser(request);
        User savedUser = userRepository.save(user);
        return UserMapper.INSTANCE.convertToUserResponse(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return UserMapper.INSTANCE.convertToUserResponses(users);
    }

    @SneakyThrows
    public UserResponse updateUser(Long id, UpdateUserRequest updateRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND, id));

        existingUser.setName(updateRequest.getName());
        existingUser.setUserRole(updateRequest.getUserRole());
        existingUser.setPassword(updateRequest.getPassword());

        User updatedUser = userRepository.save(existingUser);
        return UserMapper.INSTANCE.convertToUserResponse(updatedUser);
    }

    @SneakyThrows
    public UserResponse deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND, id));

        userRepository.delete(existingUser);
        return UserMapper.INSTANCE.convertToUserResponse(existingUser);
    }

    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    @Override
    public RegistrationResponse registration(RegistrationRequest registrationRequest) {

        // userValidationService.validateUser(registrationRequest);

        final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setUserRole(UserRole.USER);

        userRepository.save(user);

        final String username = registrationRequest.getUsername();
        log.info("{} registered successfully!", username);

        return new RegistrationResponse("Đăng ký thành công !");
    }

    @Override
    public User findAuthenticatedUserByUsername(String username) {
        final User user = findByUsername(username);
        return user;
    }
}

