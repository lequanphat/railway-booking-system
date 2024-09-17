package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dto.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UserResponse;
import com.backend.railwaybookingsystem.model.User;
import com.backend.railwaybookingsystem.dto.auth.AuthenticatedUserDto;
import com.backend.railwaybookingsystem.dto.auth.request.RegistrationRequest;
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

    @Mapping(source = "userRole", target = "userRole")
    User convertToUser(UpdateUserRequest createUserRequest);

    User convertToUser(RegistrationRequest registrationRequest);

    AuthenticatedUserDto convertToAuthenticatedUserDto(User user);

    User convertToUser(AuthenticatedUserDto authenticatedUserDto);
}
