package com.backend.railwaybookingsystem.dtos.route_segments;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalTime;

@Data
public class GetScheduleRouteSegmentsResponse {
    private Long id;

    @JsonProperty("station_id")
    private Long stationId;

    @JsonProperty("station_name")
    private String stationName;

    @JsonProperty("departure_time")
    private LocalTime departureTime;

    @JsonProperty("arrival_time")
    private LocalTime arrivalTime;

    @JsonProperty("day_number")
    private int dayNumber;
}
