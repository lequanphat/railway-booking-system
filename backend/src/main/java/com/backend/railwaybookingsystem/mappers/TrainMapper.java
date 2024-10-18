package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetTrainRouteSegmentsResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainResponse;
import com.backend.railwaybookingsystem.models.Train;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TrainMapper {
    TrainMapper INSTANCE = Mappers.getMapper(TrainMapper.class);

    TrainResponse convertToTrainResponse(Train train);

    Train convertToTrain(CreateTrainRequest request);

    List<TrainResponse> convertToTrainResponses(List<Train> trains);

    GetTrainRouteSegmentsResponse convertToGetTrainRouteSegmentsResponse(Train train);
}
