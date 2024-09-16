package com.nhatsinh.railwaybookingsystem.mappers;

import com.nhatsinh.railwaybookingsystem.dto.users.CreateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UserResponse;
import com.nhatsinh.railwaybookingsystem.model.User;
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

}
