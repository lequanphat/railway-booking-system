package com.backend.railwaybookingsystem.dtos.seat_prices;

import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.models.SeatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class SeatPriceResponse {

    private Long id;

    private double original_price_per_km;

    private SeatTypeResponse seatType;
}
