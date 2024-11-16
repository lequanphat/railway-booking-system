package com.backend.railwaybookingsystem.dtos.schedules.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
public class SearchScheduleResponse {
    @JsonProperty("id")
    private Long scheduleId;

    @JsonProperty("train_id")
    private Long trainId;

    @JsonProperty("train_name")
    private String trainName;

    @JsonProperty("departure_segment")
    private RouteSegmentDto departureSegment;

    @JsonProperty("arrival_segment")
    private RouteSegmentDto arrivalSegment;

    @NoArgsConstructor
    @Data
    public static class RouteSegmentDto {
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
}
