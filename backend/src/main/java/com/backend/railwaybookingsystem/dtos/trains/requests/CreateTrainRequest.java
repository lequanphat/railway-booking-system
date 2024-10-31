package com.backend.railwaybookingsystem.dtos.trains.requests;

import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CreateTrainRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 150, message = "Name must be between 2 and 150 characters")
    private String name;

    @Valid
    @NotNull(message = "Carriage is required")
    @Size(min = 1, message = "Carriage must have at least one seat")
    private List<Long> carriagesList;

    @Valid
    @NotNull(message = "Seat types and prices are required")
    @Size(min = 1, message = "At least one seat type price is required")
    private List<SeatPriceRequest> seatPricesList;
}