package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.models.SeatType;
import org.mapstruct.Mapper;
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
