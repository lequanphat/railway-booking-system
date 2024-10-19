package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.*;
import com.backend.railwaybookingsystem.models.Train;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TrainMapper {
    TrainMapper INSTANCE = Mappers.getMapper(TrainMapper.class);

    TrainListResponse convertToTrainListResponse(Train train);

    CreateTrainResponse convertToCreateTrainResponse(Train train);

    Train convertToTrain(CreateTrainRequest request);

    GetTrainRouteSegmentsResponse convertToGetTrainRouteSegmentsResponse(Train train);

    TrainDetailResponse convertToTrainDetailResponse(Train train);
}
