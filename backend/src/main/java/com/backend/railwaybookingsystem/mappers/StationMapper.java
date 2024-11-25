package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.stations.CreateStationRequest;
import com.backend.railwaybookingsystem.dtos.stations.StationResponse;
import com.backend.railwaybookingsystem.models.Station;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StationMapper {
    StationMapper INSTANCE = Mappers.getMapper(StationMapper.class);

    StationResponse convertToStationResponse(Station station);


    Station convertToStation(CreateStationRequest request);

}
