package com.backend.railwaybookingsystem.dtos.carriages;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class CarriageResponse {

    private Long id;

    private int position;

    private CarriageLayoutResponse carriageLayout;

}
