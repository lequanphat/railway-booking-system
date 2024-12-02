package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriages.CarriageResponse;
import com.backend.railwaybookingsystem.dtos.carriages.GetCarriageOfTrainResponse;
import com.backend.railwaybookingsystem.models.Carriage;
import org.mapstruct.*;
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

    @Mapping(source = "carriageLayout.active", target = "carriageLayoutActive")
    @Mapping(source = "carriageLayout.name", target = "carriageLayoutName")
    GetCarriageOfTrainResponse toGetCarriageOfTrainResponse(Carriage carriage);

    List<GetCarriageOfTrainResponse> toGetCarriageOfTrainResponseList(List<Carriage> carriages);
}
