package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.trains.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.TrainResponse;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Train;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TrainMapper {
    TrainMapper INSTANCE = Mappers.getMapper(TrainMapper.class);

    TrainResponse convertToTrainResponse(Train train);

    Train convertToTrain(CreateTrainRequest request);

    List<TrainResponse> convertToTrainResponses(List<Train> trains);
}
