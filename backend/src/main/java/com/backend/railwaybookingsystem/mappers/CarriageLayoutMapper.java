package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.requests.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutListResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CreateCarriageLayoutResponse;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CarriageLayoutMapper {
    CarriageLayoutMapper INSTANCE = Mappers.getMapper(CarriageLayoutMapper.class);

    CarriageLayoutResponse convertToCarriageLayoutResponse(CarriageLayout carriageLayout);

    CarriageLayout convertToCarriageLayout(CreateCarriageLayoutRequest request);

    CarriageLayoutListResponse convertToCarriageLayoutListResponse(CarriageLayout carriageLayouts);

    CreateCarriageLayoutResponse convertToCreateCarriageLayoutResponse(CarriageLayout carriageLayout);
}
