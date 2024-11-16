package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.schedules.responses.SearchScheduleResponse;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateRouteSegmentRequest;
import com.backend.railwaybookingsystem.models.RouteSegment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper
public interface RouteSegmentMapper {
    RouteSegmentMapper INSTANCE = Mappers.getMapper(RouteSegmentMapper.class);

    @Mapping(source = "stationId", target = "station.id")
    @Mapping(source = "departureTime", target = "departure_time", qualifiedByName = "stringToLocalTime")
    @Mapping(source = "arrivalTime", target = "arrival_time", qualifiedByName = "stringToLocalTime")
    RouteSegment toEntity(CreateRouteSegmentRequest request);

    List<RouteSegment> toEntities(List<CreateRouteSegmentRequest> requests);

    @Named("stringToLocalTime")
    default LocalTime stringToLocalTime(String time) {
        return LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    @Mapping(source = "station.id", target = "stationId")
    @Mapping(source = "station.name", target = "stationName")
    @Mapping(source = "departure_time", target = "departureTime")
    @Mapping(source = "arrival_time", target = "arrivalTime")
    SearchScheduleResponse.ScheduleDto.RouteSegmentDto toSearchScheduleResponseRouteSegmentDto(RouteSegment routeSegment);
}
