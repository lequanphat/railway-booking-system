package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.route_segments.GetScheduleRouteSegmentsResponse;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateRouteSegmentRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetTrainRouteSegmentsResponse;
import com.backend.railwaybookingsystem.services.RouteSegmentService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class RouteSegmentController {

    @Autowired
    private RouteSegmentService routeSegmentService;

    @GetMapping("ad/trains/{id}/route-segments")
    @Operation(tags = "Train", description = "get train route segments")
    public ResponseEntity<GetTrainRouteSegmentsResponse> getTrainRouteSegments(@PathVariable Long id) {
        var train = routeSegmentService.getTrainRouteSegments(id);
        return ResponseEntity.ok(train);
    }

    @PostMapping("ad/trains/{id}/route-segments")
    @Operation(tags = "Train", description = "add route segment to train")
    public ResponseEntity<GetTrainRouteSegmentsResponse> saveRouteSegment(@PathVariable Long id, @RequestBody List<CreateRouteSegmentRequest> request) {
        var train = routeSegmentService.saveRouteSegment(id, request);
        return ResponseEntity.ok(train);
    }

    @GetMapping("public/schedules/{id}/route-segments")
    public ResponseEntity<List<GetScheduleRouteSegmentsResponse>> getScheduleRouteSegments(
            @PathVariable Long id,
            @RequestParam Long departureStation,
            @RequestParam Long arrivalStation
    ) {
        var train = routeSegmentService.getRouteSegments(id, departureStation, arrivalStation);
        return ResponseEntity.ok(train);
    }
}
