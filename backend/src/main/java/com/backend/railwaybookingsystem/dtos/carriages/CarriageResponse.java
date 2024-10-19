package com.backend.railwaybookingsystem.dtos.carriages;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutResponse;
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
