package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.auth.response.LoginResponse;
import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "userRole", target = "userRole")
    UserResponse convertToUserResponse(User user);

    List<UserResponse> convertToUserResponses(List<User> users);

    @Mapping(source = "userRole", target = "userRole")
    User convertToUser(CreateUserRequest createUserRequest);

    User convertToUser(UpdateUserRequest createUserRequest);

    User convertToUser(RegistrationRequest registrationRequest);

    LoginResponse.AuthenticatedUserDto convertToAuthenticatedUserDto(User user);
}
