package com.backend.railwaybookingsystem.dtos.trains.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
public class CreateRouteSegmentRequest {
    @JsonProperty("station_id")
    private Long stationId;

    @JsonProperty("departure_time")
    @NotBlank(message = "Departure time must not be blank")
    private String departureTime;

    @JsonProperty("arrival_time")
    @NotBlank(message = "Arrival time must not be blank")
    private String arrivalTime;

    @JsonProperty("day_number")
    @Min(value = 1, message = "Day number must be greater than 0")
    private int dayNumber;

    @JsonProperty("distance")
    @Positive(message = "Distance must be a positive number")
    private double distance;
}
