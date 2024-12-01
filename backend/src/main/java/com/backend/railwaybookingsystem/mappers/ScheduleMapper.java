package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.schedules.responses.GetPassengersOfScheduleResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.ScheduleDetailsResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.SearchScheduleResponse;
import com.backend.railwaybookingsystem.models.Schedule;
import com.backend.railwaybookingsystem.services.RouteSegmentService;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = {RouteSegmentMapper.class})
public interface ScheduleMapper {
    ScheduleMapper INSTANCE = Mappers.getMapper(ScheduleMapper.class);

    List<GetScheduleByDateResponse> convertToGetScheduleByDateResponseList(List<Schedule> schedules);

    ScheduleDetailsResponse convertToScheduleDetailsResponse(Schedule schedule);

    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "schedule.train.id", target = "trainId")
    @Mapping(source = "schedule.train.name", target = "trainName")
    @Mapping(target = "departureSegment", expression = "java(routeSegmentService.getRouteSegmentByTrainAndStation(schedule.getTrain().getId(), departureStationId))")
    @Mapping(target = "arrivalSegment", expression = "java(routeSegmentService.getRouteSegmentByTrainAndStation(schedule.getTrain().getId(), arrivalStationId))")
    SearchScheduleResponse.ScheduleDto convertToSearchScheduleResponse(Schedule schedule, @Context RouteSegmentService routeSegmentService, Long departureStationId, Long arrivalStationId);

    SearchScheduleResponse convertToSearchScheduleResponseV2(
            Long departureId, Long arrivalId, String departureName, String arrivalName,
            String departureTime, String arrivalTime,
            List<SearchScheduleResponse.ScheduleDto> departureSchedules,
            List<SearchScheduleResponse.ScheduleDto> returnSchedules,
            String tripType
    );

    GetPassengersOfScheduleResponse convertToGetPassengersOfScheduleResponse(Schedule schedule);
}
