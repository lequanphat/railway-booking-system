package com.backend.railwaybookingsystem.dtos.schedules.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
public class SearchScheduleResponse {
    @JsonProperty("departure_id")
    private Long departureId;

    @JsonProperty("arrival_id")
    private Long arrivalId;

    @JsonProperty("departure_name")
    private String departureName;

    @JsonProperty("arrival_name")
    private String arrivalName;

    @JsonProperty("departure_time")
    private String departureTime;

    @JsonProperty("arrival_time")
    private String arrivalTime;

    @JsonProperty("departure_schedules")
    List<ScheduleDto> departureSchedules;

    @JsonProperty("return_schedules")
    List<ScheduleDto> returnSchedules;

    @JsonProperty("trip_type")
    private String tripType;

    @NoArgsConstructor
    @Data
    public static class ScheduleDto {
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
}
