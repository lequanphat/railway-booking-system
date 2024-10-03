package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.exceptions.DuplicatedException;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.UserMapper;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.models.UserVerification;
import com.backend.railwaybookingsystem.repositories.UserRepository;
import com.backend.railwaybookingsystem.services.EmailService;
import com.backend.railwaybookingsystem.services.UserService;
import com.backend.railwaybookingsystem.services.UserVerificationService;
import com.backend.railwaybookingsystem.utils.ErrorCode;
import com.backend.railwaybookingsystem.utils.Generator;
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
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserVerificationService userVerificationService;

    public UserResponse saveUser(CreateUserRequest request) {
        User existingUser = this.findAuthenticatedUserByEmail(request.getEmail());
        if (existingUser != null) {
            throw new DuplicatedException(ErrorCode.USER_ALREADY_EXISTS, request.getEmail());
        }
        User user = UserMapper.INSTANCE.convertToUser(request);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setIs_verified(true);
        User savedUser = userRepository.save(user);
        return UserMapper.INSTANCE.convertToUserResponse(savedUser);
    }


    public Page<UserResponse> getUsers(UserRole role, String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<User> userPage;
        if (keyword != null && !keyword.isEmpty()) {
            userPage = userRepository.searchUserByFields(role, keyword, pageRequest);
        } else {
            userPage = userRepository.findByUserRole(role, pageRequest);
        }

        List<UserResponse> userResponseList = UserMapper.INSTANCE.convertToUserResponses(userPage.getContent());

        return new PageImpl<>(userResponseList, pageRequest, userPage.getTotalElements());
    }

    @SneakyThrows
    public UserResponse updateUser(Long id, UpdateUserRequest updateRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND, id));

        existingUser.setName(updateRequest.getName());
        existingUser.setPhone(updateRequest.getPhone());
        existingUser.setAddress(updateRequest.getAddress());

        if(updateRequest.getIs_deleted() != null){
            existingUser.setIs_deleted(updateRequest.getIs_deleted());
        }

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
    public RegistrationResponse registration(RegistrationRequest registrationRequest) {
        User existingUser = this.findAuthenticatedUserByEmail(registrationRequest.getEmail());
        if (existingUser != null) {
            throw new DuplicatedException(ErrorCode.USER_ALREADY_EXISTS, registrationRequest.getEmail());
        }
        final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setUserRole(UserRole.USER);

        User savedUser = userRepository.save(user);

        final String email = registrationRequest.getEmail();

        String token = UUID.randomUUID().toString();

        userVerificationService.createUserVerification(savedUser, token);

        emailService.sendVerificationEmail(email, token);

        return new RegistrationResponse(email , "OK");
    }

    @Override
    public User findAuthenticatedUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    @Override
    public Boolean userExists(String email){
        return userRepository.existsByEmail(email);
    }

    @Override
    public Optional<User> findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public  User verifyAccount(String token){
        User user = userVerificationService.validateToken(token);
        if(user == null){
            throw new BadRequestException("Invalid token");
        }
        user.setIs_verified(true);
        return userRepository.save(user);
    }
}

