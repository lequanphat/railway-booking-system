package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriages.CarriageResponse;
import com.backend.railwaybookingsystem.dtos.seats.SeatResponse;
import com.backend.railwaybookingsystem.dtos.trains.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.TrainResponse;
import com.backend.railwaybookingsystem.models.Carriage;
import com.backend.railwaybookingsystem.models.Seat;
import com.backend.railwaybookingsystem.models.Train;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CarriageMapper {
    CarriageMapper INSTANCE = Mappers.getMapper(CarriageMapper.class);

    CarriageResponse convertToCarriageResponse(Carriage train);

    default CarriageResponse convertToCarriageResponseWithLayout(Carriage carriage) {
        CarriageResponse response = convertToCarriageResponse(carriage);
        response.setCarriageLayout(CarriageLayoutMapper.INSTANCE.convertToCarriageLayoutResponse(carriage.getCarriageLayout()));
        return response;
    }
}
