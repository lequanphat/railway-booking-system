package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.models.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface SeatTypeService {
    List<SeatTypeResponse> getAllSeatTypes();
    Page<SeatTypeResponse> getSeatTypes(String keyword, int page, int size);

    SeatTypeResponse saveSeatType(CreateSeatTypeRequest request);
}
