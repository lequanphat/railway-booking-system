package com.backend.railwaybookingsystem.dtos.trains;

import com.backend.railwaybookingsystem.dtos.carriages.CarriageResponse;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceResponse;
import com.backend.railwaybookingsystem.dtos.seats.SeatResponse;
import com.backend.railwaybookingsystem.models.SeatPrice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class TrainResponse {

    private Long id;

    private String name;

    private Boolean is_active;

    private List<CarriageResponse> carriages;

    private List<SeatPriceResponse> seatPrices;
}
