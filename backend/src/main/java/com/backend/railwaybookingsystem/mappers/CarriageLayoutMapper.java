package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.SeatType;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CarriageLayoutMapper {
    CarriageLayoutMapper INSTANCE = Mappers.getMapper(CarriageLayoutMapper.class);

    CarriageLayoutResponse convertToCarriageLayoutResponse(CarriageLayout carriageLayout);

    CarriageLayout convertToCarriageLayout(CreateCarriageLayoutRequest request);

    List<CarriageLayoutResponse> convertToCarriageLayoutResponses(List<CarriageLayout> carriageLayouts);
}
