package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.route_segments.GetScheduleRouteSegmentsResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.SearchScheduleResponse;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateRouteSegmentRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetTrainRouteSegmentsResponse;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.RouteSegmentMapper;
import com.backend.railwaybookingsystem.mappers.TrainMapper;
import com.backend.railwaybookingsystem.models.RouteSegment;
import com.backend.railwaybookingsystem.models.Train;
import com.backend.railwaybookingsystem.repositories.RouteSegmentRepository;
import com.backend.railwaybookingsystem.repositories.TrainRepository;
import com.backend.railwaybookingsystem.services.RouteSegmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteSegmentServiceImpl implements RouteSegmentService {

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private RouteSegmentRepository routeSegmentRepository;

    @Override
    public GetTrainRouteSegmentsResponse getTrainRouteSegments(Long id) {
        return trainRepository.findById(id)
                .map(TrainMapper.INSTANCE::convertToGetTrainRouteSegmentsResponse)
                .orElse(null);
    }

    @Override
    public GetTrainRouteSegmentsResponse saveRouteSegment(Long id, List<CreateRouteSegmentRequest> request) {
        Train train = trainRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Train not found"));

        routeSegmentRepository.deleteByTrainId(id);

        List<RouteSegment> routeSegments = RouteSegmentMapper.INSTANCE.toEntities(request);
        routeSegments.forEach(routeSegment -> routeSegment.setTrain(train));
        train.setRouteSegments(routeSegments);

        trainRepository.save(train);

        return TrainMapper.INSTANCE.convertToGetTrainRouteSegmentsResponse(train);
    }

    @Override
    public SearchScheduleResponse.ScheduleDto.RouteSegmentDto getRouteSegmentByTrainAndStation(Long trainId, Long stationId) {
        var segment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(trainId, stationId);
        return RouteSegmentMapper.INSTANCE.toSearchScheduleResponseRouteSegmentDto(segment);
    }

    @Override
    public List<GetScheduleRouteSegmentsResponse> getRouteSegments(Long scheduleId, Long departureId, Long arrivalId) {
        var routeSegments = routeSegmentRepository.getRouteSegmentsByScheduleId(scheduleId);

        var departureNode = routeSegments.stream().filter(routeSegment -> {
            return departureId.equals(routeSegment.getStation().getId());
        }).findFirst().orElse(null);

        var arrivalNode = routeSegments.stream().filter(routeSegment -> {
            return arrivalId.equals(routeSegment.getStation().getId());
        }).findFirst().orElse(null);

        var routeSegmentResponse = routeSegments.stream()
                .filter(routeSegment -> routeSegment.getDistance() >= departureNode.getDistance()
                        && routeSegment.getDistance() <= arrivalNode.getDistance())
                .sorted(
                        (a, b) -> {
                            if (a.getDistance() > b.getDistance()) {
                                return 1;
                            } else if (a.getDistance() < b.getDistance()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                )
                .toList();


        return RouteSegmentMapper.INSTANCE.toGetScheduleRouteSegmentsResponse(routeSegmentResponse);
    }
}
