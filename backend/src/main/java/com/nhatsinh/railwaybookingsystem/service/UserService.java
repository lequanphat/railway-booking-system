package com.nhatsinh.railwaybookingsystem.service;

import com.nhatsinh.railwaybookingsystem.dto.users.CreateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UserResponse;
import com.nhatsinh.railwaybookingsystem.exceptions.DuplicatedException;
import com.nhatsinh.railwaybookingsystem.exceptions.NotFoundException;
import com.nhatsinh.railwaybookingsystem.mappers.UserMapper;
import com.nhatsinh.railwaybookingsystem.model.User;
import com.nhatsinh.railwaybookingsystem.repository.UserRepository;
import com.nhatsinh.railwaybookingsystem.utils.ErrorCode;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
}
