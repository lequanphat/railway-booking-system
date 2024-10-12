package com.backend.railwaybookingsystem.dtos.seat_prices;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class SeatPriceRequest {

    @NotNull(message = "Seat type ID is required")
    private Long seat_type_id;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;
}