package com.backend.railwaybookingsystem.dtos.schedules.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@Builder
public class SearchScheduleResponseV2 {
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
    List<SearchScheduleResponse> departureSchedules;

    @JsonProperty("return_schedules")
    List<SearchScheduleResponse> returnSchedules;

    @JsonProperty("trip_type")
    private String tripType;
}
