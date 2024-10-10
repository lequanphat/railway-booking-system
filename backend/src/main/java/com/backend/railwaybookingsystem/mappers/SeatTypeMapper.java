package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.auth.AuthenticatedUserDto;
import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SeatTypeMapper {
    SeatTypeMapper INSTANCE = Mappers.getMapper(SeatTypeMapper.class);

    SeatTypeResponse convertToSeatTypeResponse(SeatType seatType);

    List<SeatTypeResponse> convertToSeatTypeResponses(List<SeatType> seatTypes);

    SeatType convertToSeatType(CreateSeatTypeRequest request);
}
