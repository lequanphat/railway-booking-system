package com.farukgenc.boilerplate.springboot.mappers;

import com.farukgenc.boilerplate.springboot.dto.users.CreateUserRequest;
import com.farukgenc.boilerplate.springboot.dto.users.UpdateUserRequest;
import com.farukgenc.boilerplate.springboot.dto.users.UserResponse;
import com.farukgenc.boilerplate.springboot.model.User;
import com.farukgenc.boilerplate.springboot.security.dto.AuthenticatedUserDto;
import com.farukgenc.boilerplate.springboot.security.dto.RegistrationRequest;
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
