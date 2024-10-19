package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.requests.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutListResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CreateCarriageLayoutResponse;
import org.springframework.data.domain.Page;

public interface CarriageLayoutService {

    CarriageLayoutResponse getCarriageLayoutById(Long id);

    CreateCarriageLayoutResponse saveCarriageLayout(CreateCarriageLayoutRequest request);

    Page<CarriageLayoutListResponse> getCarriageLayouts(String keyword, int page, int size);
}
