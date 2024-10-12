package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.auth.request.RegistrationRequest;
import com.backend.railwaybookingsystem.dtos.auth.response.RegistrationResponse;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.exceptions.DuplicatedException;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.SeatTypeMapper;
import com.backend.railwaybookingsystem.mappers.UserMapper;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.repositories.SeatTypeRepository;
import com.backend.railwaybookingsystem.repositories.UserRepository;
import com.backend.railwaybookingsystem.services.EmailService;
import com.backend.railwaybookingsystem.services.SeatTypeService;
import com.backend.railwaybookingsystem.services.UserService;
import com.backend.railwaybookingsystem.services.UserVerificationService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class SeatTypeServiceImpl implements SeatTypeService {

    @Autowired
    private SeatTypeRepository seatTypeRepository;

    public List<SeatTypeResponse> getAllSeatTypes() {
        List<SeatType> seatTypes = seatTypeRepository.findAll();
        return SeatTypeMapper.INSTANCE.convertToSeatTypeResponses(seatTypes);
    }

    public Page<SeatTypeResponse> getSeatTypes(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<SeatType> seatTypes = seatTypeRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword, pageRequest);

        List<SeatTypeResponse> userResponseList = SeatTypeMapper.INSTANCE.convertToSeatTypeResponses(seatTypes.getContent());

        return new PageImpl<>(userResponseList, pageRequest, seatTypes.getTotalElements());
    }

    public SeatTypeResponse saveSeatType(CreateSeatTypeRequest request) {
        SeatType seatType = SeatTypeMapper.INSTANCE.convertToSeatType(request);
        SeatType savedSeatType = seatTypeRepository.save(seatType);
        return SeatTypeMapper.INSTANCE.convertToSeatTypeResponse(savedSeatType);
    }

}

