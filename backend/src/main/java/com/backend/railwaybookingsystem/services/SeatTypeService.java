package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SeatTypeService {
    List<SeatTypeResponse> getAllSeatTypes();
    Page<SeatTypeResponse> getSeatTypes(String keyword, int page, int size);

    SeatTypeResponse saveSeatType(CreateSeatTypeRequest request);
}
