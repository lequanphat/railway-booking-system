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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Page<UserResponse> getUsers(int page, int size, String keyword) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<User> userPage;
        if (keyword != null && !keyword.isEmpty()) {
            userPage = userRepository.findByNameContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword,keyword,keyword, pageRequest);
        } else {
            userPage = userRepository.findAll(pageRequest);
        }

        List<UserResponse> userResponseList = UserMapper.INSTANCE.convertToUserResponses(userPage.getContent());

        return new PageImpl<>(userResponseList, pageRequest, userPage.getTotalElements());
    }

    @SneakyThrows
    public UserResponse updateUser(Long id, UpdateUserRequest updateRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND, id));

        existingUser.setName(updateRequest.getName());

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
    public AuthenticatedUserDto findAuthenticatedUserByUsername(String username) {

        final User user = findByUsername(username);

        return UserMapper.INSTANCE.convertToAuthenticatedUserDto(user);
    }
}

