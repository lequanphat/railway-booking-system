package com.backend.railwaybookingsystem.dtos.trains.responses;

import com.backend.railwaybookingsystem.dtos.carriages.CarriageResponse;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceResponse;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class TrainResponse {

    private Long id;

    private String name;

    private Boolean is_active;

    private List<CarriageResponse> carriages;

    private List<SeatPriceResponse> seatPrices;


}
