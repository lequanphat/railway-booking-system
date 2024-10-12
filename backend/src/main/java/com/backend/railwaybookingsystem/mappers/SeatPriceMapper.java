package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriages.CarriageResponse;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceResponse;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.dtos.seats.SeatResponse;
import com.backend.railwaybookingsystem.models.Carriage;
import com.backend.railwaybookingsystem.models.Seat;
import com.backend.railwaybookingsystem.models.SeatPrice;
import com.backend.railwaybookingsystem.models.SeatType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SeatPriceMapper {
    SeatPriceMapper INSTANCE = Mappers.getMapper(SeatPriceMapper.class);

    @Mapping(source = "seatPrice.id", target = "id")
    @Mapping(source = "seatPrice.original_price_per_km", target = "original_price_per_km")
    @Mapping(source = "seatPrice.seatType", target = "seatType")
    SeatPriceResponse convertToSeatPriceResponse(SeatPrice seatPrice);


    default SeatPriceResponse convertToSeatPriceResponseWithType(SeatPrice seatPrice) {
        SeatPriceResponse response = convertToSeatPriceResponse(seatPrice);
        response.setSeatType(SeatTypeMapper.INSTANCE.convertToSeatTypeResponse(seatPrice.getSeatType()));
        return response;
    }
}
