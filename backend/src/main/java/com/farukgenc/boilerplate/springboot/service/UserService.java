package com.farukgenc.boilerplate.springboot.service;

import com.farukgenc.boilerplate.springboot.dto.users.CreateUserRequest;
import com.farukgenc.boilerplate.springboot.dto.users.UpdateUserRequest;
import com.farukgenc.boilerplate.springboot.dto.users.UserResponse;
import com.farukgenc.boilerplate.springboot.exceptions.AppException;
import com.farukgenc.boilerplate.springboot.mappers.UserMapper;
import com.farukgenc.boilerplate.springboot.model.User;
import com.farukgenc.boilerplate.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse saveUser(CreateUserRequest createUserRequest) {
        User existingUser = userRepository.findByUsername(createUserRequest.getUsername());
        if (existingUser != null) {
            throw new AppException("This username is already being used!", HttpStatus.NOT_FOUND);
        }
        User user = UserMapper.INSTANCE.convertToUser(createUserRequest);
        User savedUser = userRepository.save(user);
        return UserMapper.INSTANCE.convertToUserResponse(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return UserMapper.INSTANCE.convertToUserResponses(users);
    }

    public UserResponse updateUser(Long id, UpdateUserRequest updateRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

        existingUser.setName(updateRequest.getName());
        existingUser.setUserRole(updateRequest.getUserRole());
        existingUser.setPassword(updateRequest.getPassword());

        User updatedUser = userRepository.save(existingUser);
        return UserMapper.INSTANCE.convertToUserResponse(updatedUser);
    }

    public UserResponse deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

        userRepository.delete(existingUser);
        return UserMapper.INSTANCE.convertToUserResponse(existingUser);
    }
}
