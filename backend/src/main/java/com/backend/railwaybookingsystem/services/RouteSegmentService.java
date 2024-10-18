package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateRouteSegmentRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetTrainRouteSegmentsResponse;

import java.util.List;

public interface RouteSegmentService {
    GetTrainRouteSegmentsResponse getTrainRouteSegments(Long id);
    GetTrainRouteSegmentsResponse saveRouteSegment(Long id, List<CreateRouteSegmentRequest> request);
}
