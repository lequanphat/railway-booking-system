package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import org.springframework.data.domain.Page;

public interface CarriageLayoutService {

    CarriageLayoutResponse getCarriageLayoutById(Long id);

    CarriageLayoutResponse saveCarriageLayout(CreateCarriageLayoutRequest request);

    Page<CarriageLayoutResponse> getCarriageLayouts(String keyword, int page, int size);
}
