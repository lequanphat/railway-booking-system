package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.seats.SeatResponse;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SeatMapper {
    SeatMapper INSTANCE = Mappers.getMapper(SeatMapper.class);

    SeatResponse convertToSeatResponse(Seat seat);

    default SeatResponse convertToSeatResponseWithType(Seat seat) {
        SeatResponse response = convertToSeatResponse(seat);
        response.setSeatType(SeatTypeMapper.INSTANCE.convertToSeatTypeResponse(seat.getSeatType()));
        return response;
    }

}
