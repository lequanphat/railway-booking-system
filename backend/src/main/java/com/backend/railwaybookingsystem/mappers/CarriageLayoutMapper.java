package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutListResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CreateCarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetTrainRouteSegmentsResponse;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import com.backend.railwaybookingsystem.models.Train;
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

    @Mapping(target = "seats", expression = "java(sortSeatsByPosition(carriageLayout.getSeats()))")
    CarriageLayoutResponse convertToCarriageLayoutResponse(CarriageLayout carriageLayout);

    CarriageLayout convertToCarriageLayout(CreateCarriageLayoutRequest request);

    CarriageLayoutListResponse convertToCarriageLayoutListResponse(CarriageLayout carriageLayouts);

    CreateCarriageLayoutResponse convertToCreateCarriageLayoutResponse(CarriageLayout carriageLayout);


    default List<CarriageLayoutResponse.SeatDto> sortSeatsByPosition(List<Seat> seats) {
        return seats.stream()
                .sorted(Comparator.comparingInt(Seat::getPosition).reversed())
                .map(seat -> new CarriageLayoutResponse.SeatDto(
                        seat.getId(), seat.getPosition(),
                        new CarriageLayoutResponse.SeatDto.SeatTypeDto(
                                seat.getSeatType().getId(),
                                seat.getSeatType().getName(),
                                seat.getSeatType().getCode(),
                                seat.getSeatType().getOriginal_price_per_km(),
                                seat.getSeatType().getActive()
                        )
                ))
                .collect(Collectors.toList());
    }

}
